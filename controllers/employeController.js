const { catchAsynErrors } = require("../middlewares/catchAsynErrors");
const Employe = require("../models/employModel");
const Job = require("../models/jobModel");
const Internship = require("../models/internshipModel");
const ErrorHandler = require("../utils/ErrorHandler");
const { sendtoken } = require("../utils/SendToken");
const { sendmail } = require("../utils/sendMail");
const path = require("path");
const imagekit = require("../utils/imageKit").initImageKit();

exports.Homepage = catchAsynErrors(async (req, res, next) => {
  res.json({ message: "Secure Employe Homepage" });
});

exports.currentemploye = catchAsynErrors(async (req, res, next) => {
  const employe = await Employe.findById(req.id).exec();

  res.json({ employe });
});

exports.employesignup = catchAsynErrors(async (req, res, next) => {
  const employe = await new Employe(req.body).save();
  sendtoken(employe, 201, res);
});

exports.employesignin = catchAsynErrors(async (req, res, next) => {
  const employe = await Employe.findOne({ email: req.body.email })
    .select("+password")
    .exec();
  if (!employe) {
    return next(
      new ErrorHandler("user not found with this email address", 404)
    );
  }

  const isMatch = employe.comparepassword(req.body.password);

  if (!isMatch) return next(new ErrorHandler("Wrong Credentials", 500));

  sendtoken(employe, 200, res);
});

exports.employesignout = catchAsynErrors(async (req, res, next) => {
  res.clearCookie("token");
  res.json({ message: "Successfully signout!" });
});

exports.employesendmail = catchAsynErrors(async (req, res, next) => {
  const employe = await Employe.findOne({ email: req.body.email }).exec();

  if (!employe) {
    return next(
      new ErrorHandler("user not found with this email address", 404)
    );
  }

  const url = `${req.protocol}://${req.get("host")}/employe/forget-link/${
    employe._id
  }`;

  employe.resetPasswordToken = "1";
  await employe.save();
  sendmail(req, res, next, url);

  res.json({ employe, url });
});

exports.employeforgetlink = catchAsynErrors(async (req, res, next) => {
  const employe = await Employe.findById(req.params.id).exec();

  if (!employe) {
    return next(
      new ErrorHandler("user not found with this email address", 404)
    );
  }

  if (employe.resetPasswordToken == "1") {
    employe.resetPasswordToken = "0";
    employe.password = req.body.password;
  } else {
    return next(new ErrorHandler("Link Expired!!!", 500));
  }
  await employe.save();
  res.status(200).json({ message: "Password has been successfully Changed" });
});

exports.employeresetpassword = catchAsynErrors(async (req, res, next) => {
  const employe = await Employe.findById(req.params.id).exec();
  employe.password = req.body.password;
  await employe.save();
  sendtoken(employe, 201, res);
});

exports.employeupdate = catchAsynErrors(async (req, res, next) => {
  await Employe.findByIdAndUpdate(req.params.id, req.body).exec();
  res.status(200).json({
    success: true,
    message: "employe Updated Successfully!",
  });
});

exports.employedelete = catchAsynErrors(async (req, res, next) => {
  await Employe.findByIdAndDelete(req.params.id).exec();
  res.status(200).json({
    success: true,
    message: "Employe Deleted Successfully!",
  });
});

exports.employeavatar = catchAsynErrors(async (req, res, next) => {
  const employe = await Employe.findById(req.params.id).exec();
  const file = req.files.organizationlogo;
  const modifiedFileName = `resumebuilder-${Date.now()}${path.extname(
    file.name
  )}`;

  if (employe.organizationlogo.fileId !== "") {
    await imagekit.deleteFile(employe.organizationlogo.fileId);
  }

  const { fileId, url } = await imagekit.upload({
    file: file.data,
    fileName: modifiedFileName,
  });

  employe.organizationlogo = { fileId, url };
  await employe.save();
  res.status(200).json({
    success: true,
    message: "Profile updated!",
  });
});

// ------------------------ Internship ----------------------

exports.createinternship = catchAsynErrors(async (req, res, next) => {
  const employe = await Employe.findById(req.id).exec();
  const internship = await new Internship(req.body).save();
  internship.employe= employe._id;
  employe.internships.push(internship._id);
  await internship.save();
  await employe.save();
  res.status(201).json({ success: true, internship });
});

exports.readinternship = catchAsynErrors(async (req, res, next) => {
  const { internships } = await Employe.findById(req.id)
    .populate("internships")
    .exec();
  res.status(200).json({ success: true, internships });
});

exports.readsingleinternship = catchAsynErrors(async (req, res, next) => {
  const internship = await Internship.findById(req.params.id).exec();
  res.status(200).json({ success: true, internship });
});

// ------------------------ job ----------------------

exports.createjob = catchAsynErrors(async (req, res, next) => {
  const employe = await Employe.findById(req.id).exec();
  const job = await new Job(req.body).save();
  job.employe= employe._id;
  employe.jobs.push(job._id);
  await job.save();
  await employe.save();
  res.status(201).json({ success: true, job });
});

exports.readjob = catchAsynErrors(async (req, res, next) => {
  const { jobs } = await Employe.findById(req.id)
    .populate("jobs")
    .exec();
  res.status(200).json({ success: true, jobs });
});

exports.readsinglejob = catchAsynErrors(async (req, res, next) => {
  const job = await Job.findById(req.params.id).exec();
  res.status(200).json({ success: true, job });
});
