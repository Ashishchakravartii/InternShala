const { catchAsynErrors } = require("../middlewares/catchAsynErrors");
const Student = require("../models/studentModel");
const Internship = require("../models/internshipModel");
const Job = require("../models/jobModel");
const ErrorHandler = require("../utils/ErrorHandler");
const { sendtoken } = require("../utils/SendToken");
const { sendmail } = require("../utils/sendMail");
const path = require("path");
const imagekit = require("../utils/imageKit").initImageKit();
exports.Homepage = catchAsynErrors(async (req, res, next) => {
  res.json({ message: "Secure Homepage" });
});

exports.currentUser = catchAsynErrors(async (req, res, next) => {
  const student = await Student.findById(req.id).exec();

  res.json({ student });
});

exports.studentsignup = catchAsynErrors(async (req, res, next) => {
  const student = await new Student(req.body).save();
  sendtoken(student, 201, res);
});

exports.studentsignin = catchAsynErrors(async (req, res, next) => {
  const student = await Student.findOne({ email: req.body.email })
    .select("+password")
    .exec();
  if (!student) {
    return next(
      new ErrorHandler("user not found with this email address", 404)
    );
  }

  const isMatch = student.comparepassword(req.body.password);

  if (!isMatch) return next(new ErrorHandler("Wrong Credentials", 500));

  sendtoken(student, 200, res);
});
exports.studentsignout = catchAsynErrors(async (req, res, next) => {
  res.clearCookie("token");
  res.json({ message: "Successfully signout!" });
});
exports.studentsendmail = catchAsynErrors(async (req, res, next) => {
  const student = await Student.findOne({ email: req.body.email }).exec();

  if (!student) {
    return next(
      new ErrorHandler("user not found with this email address", 404)
    );
  }

  const url = `${req.protocol}://${req.get("host")}/student/forget-link/${
    student._id
  }`;

  student.resetPasswordToken = "1";
  await student.save();
  sendmail(req, res, next, url);

  res.json({ student, url });
});
exports.studentforgetlink = catchAsynErrors(async (req, res, next) => {
  const student = await Student.findById(req.params.id).exec();

  if (!student) {
    return next(
      new ErrorHandler("user not found with this email address", 404)
    );
  }

  if (student.resetPasswordToken == "1") {
    student.resetPasswordToken = "0";
    student.password = req.body.password;
  } else {
    return next(new ErrorHandler("Link Expired!!!", 500));
  }
  await student.save();
  res.status(200).json({ message: "Password has been successfully Changed" });
});
exports.studentresetpassword = catchAsynErrors(async (req, res, next) => {
  const student = await Student.findById(req.params.id).exec();
  student.password = req.body.password;
  await student.save();
  sendtoken(student, 201, res);
});

exports.studentupdate = catchAsynErrors(async (req, res, next) => {
  await Student.findByIdAndUpdate(req.params.id, req.body).exec();
  res.status(200).json({
    success: true,
    message: "Student Updated Successfully!",
  });
});

exports.studentdelete = catchAsynErrors(async (req, res, next) => {
  await Student.findByIdAndDelete(req.params.id).exec();
  res.status(200).json({
    success: true,
    message: "Student Deleted Successfully!",
  });
});

exports.studentavatar = catchAsynErrors(async (req, res, next) => {
  const student = await Student.findById(req.params.id).exec();
  const file = req.files.avatar;
  const modifiedFileName = `resumebuilder-${Date.now()}${path.extname(
    file.name
  )}`;

 if (student.avatar.fileId !== "") {
   await imagekit.deleteFile(student.avatar.fileId);
 }

const { fileId, url } = await imagekit.upload({
  file: file.data,
  fileName: modifiedFileName,
});

 student.avatar = { fileId, url };
await student.save();
res.status(200).json({
  success:true,
  message:"Profile updated!"
});


});

// ---------------------- apply internship ------------

exports.applyinternship = catchAsynErrors(async (req, res, next) => {
  const student = await Student.findById(req.id).exec();
  const internship = await Internship.findById(req.params.internshipid).exec();

  student.internships.push(internship._id);
  internship.students.push(student._id);
  await student.save();
  await internship.save();


  res.json({ student, internship  });
});



// ---------------------- apply job -----------------------

exports.applyjob = catchAsynErrors(async (req, res, next) => {
  const student = await Student.findById(req.id).exec();
  const job = await Job.findById(req.params.jobid).exec();

  student.jobs.push(job._id);
  job.students.push(student._id);
  await student.save();
  await job.save();


  res.json({ student });
});