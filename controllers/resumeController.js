const { catchAsynErrors } = require("../middlewares/catchAsynErrors");
const Student = require("../models/studentModel");
const ErrorHandler = require("../utils/ErrorHandler");
const { v4: uuidv4 } = require("uuid");

exports.resume = catchAsynErrors(async (req, res, next) => {
  const { resume } = await Student.findById(req.id).exec();
  res.json({ message: "Secure Resume Page !!!", resume });
});

exports.addeducation = catchAsynErrors(async (req, res, next) => {
  const student = await Student.findById(req.id).exec();
  student.resume.education.push({ ...req.body, id: uuidv4() });
  await student.save();
  res.json({ message: "Education Added!!!" });
});

exports.editeducation = catchAsynErrors(async (req, res, next) => {
  const student = await Student.findById(req.id).exec();
  const eduIndex = await student.resume.education.findIndex(
    (i) => i.id === req.params.eduid
  );

  student.resume.education[eduIndex] = {
    ...student.resume.education[eduIndex],
    ...req.body,
  };
  await student.save();
  res.json({ message: "Education Added!!!" });
});

exports.deleteeducation = catchAsynErrors(async (req, res, next) => {
  const student = await Student.findById(req.id).exec();
  const filterededu = await student.resume.education.filter(
    (i) => i.id !== req.params.eduid
  );

  student.resume.education = filterededu;
  await student.save();
  res.json({ message: "Education Deleted !!!" });
});

exports.addjob = catchAsynErrors(async (req, res, next) => {
  const student = await Student.findById(req.id).exec();
  student.resume.jobs.push({ ...req.body, id: uuidv4() });
  await student.save();
  res.json({ message: "job Added!!!" });
});

exports.editjob = catchAsynErrors(async (req, res, next) => {
  const student = await Student.findById(req.id).exec();
  const jobIndex = await student.resume.jobs.findIndex(
    (i) => i.id === req.params.jobid
  );

  student.resume.jobs[jobIndex] = {
    ...student.resume.jobs[jobIndex],
    ...req.body,
  };
  await student.save();
  res.json({ message: "Job Edited!!!" });
});

exports.deletejob = catchAsynErrors(async (req, res, next) => {
  const student = await Student.findById(req.id).exec();
  const filteredjob = await student.resume.jobs.filter(
    (i) => i.id !== req.params.jobid
  );

  student.resume.jobs = filteredjob;
  await student.save();
  res.json({ message: "Job Deleted !!!" });
});

exports.addinternship = catchAsynErrors(async (req, res, next) => {
  const student = await Student.findById(req.id).exec();
  student.resume.internships.push({ ...req.body, id: uuidv4() });
  await student.save();
  res.json({ message: "internship Added!!!" });
});

exports.editinternship = catchAsynErrors(async (req, res, next) => {
  const student = await Student.findById(req.id).exec();
  const internshipIndex = await student.resume.internships.findIndex(
    (i) => i.id === req.params.internshipid
  );

  student.resume.internships[internshipIndex] = {
    ...student.resume.internships[internshipIndex],
    ...req.body,
  };
  await student.save();
  res.json({ message: "internship Edited!!!" });
});

exports.deleteinternship = catchAsynErrors(async (req, res, next) => {
  const student = await Student.findById(req.id).exec();
  const filteredinternship = await student.resume.internships.filter(
    (i) => i.id !== req.params.internshipid
  );

  student.resume.internships = filteredinternship;
  await student.save();
  res.json({ message: "internship Deleted !!!" });
});

exports.addresponsibilities = catchAsynErrors(async (req, res, next) => {
  const student = await Student.findById(req.id).exec();
  student.resume.responsibilities.push({ ...req.body, id: uuidv4() });
  await student.save();
  res.json({ message: "responsibilities Added!!!" });
});

exports.editresponsibilities = catchAsynErrors(async (req, res, next) => {
  const student = await Student.findById(req.id).exec();
  const responsibilitieIndex = await student.resume.responsibilities.findIndex(
    (i) => i.id === req.params.responsibilitieid
  );

  student.resume.responsibilities[responsibilitieIndex] = {
    ...student.resume.responsibilities[responsibilitieIndex],
    ...req.body,
  };
  await student.save();
  res.json({ message: "responsibilities Edited!!!" });
});

exports.deleteresponsibilities = catchAsynErrors(async (req, res, next) => {
  const student = await Student.findById(req.id).exec();
  const filteredresponsibilitie = await student.resume.responsibilities.filter(
    (i) => i.id !== req.params.responsibilitieid
  );

  student.resume.responsibilities = filteredresponsibilitie;
  await student.save();
  res.json({ message: "responsibilities Deleted !!!" });
});

exports.addcourses = catchAsynErrors(async (req, res, next) => {
  const student = await Student.findById(req.id).exec();
  student.resume.courses.push({ ...req.body, id: uuidv4() });
  await student.save();
  res.json({ message: "courses Added!!!" });
});

exports.editcourses = catchAsynErrors(async (req, res, next) => {
  const student = await Student.findById(req.id).exec();
  const coursesIndex = await student.resume.courses.findIndex(
    (i) => i.id === req.params.coursesid
  );

  student.resume.courses[coursesIndex] = {
    ...student.resume.courses[coursesIndex],
    ...req.body,
  };
  await student.save();
  res.json({ message: "courses Edited!!!" });
});

exports.deletecourses = catchAsynErrors(async (req, res, next) => {
  const student = await Student.findById(req.id).exec();
  const filteredcourses = await student.resume.courses.filter(
    (i) => i.id !== req.params.coursesid
  );

  student.resume.courses = filteredcourses;
  await student.save();
  res.json({ message: "courses Deleted !!!" });
});

exports.addprojects = catchAsynErrors(async (req, res, next) => {
  const student = await Student.findById(req.id).exec();
  student.resume.projects.push({ ...req.body, id: uuidv4() });
  await student.save();
  res.json({ message: "projects Added!!!" });
});

exports.editprojects = catchAsynErrors(async (req, res, next) => {
  const student = await Student.findById(req.id).exec();
  const projectsIndex = await student.resume.projects.findIndex(
    (i) => i.id === req.params.projectsid
  );

  student.resume.projects[projectsIndex] = {
    ...student.resume.projects[projectsIndex],
    ...req.body,
  };
  await student.save();
  res.json({ message: "projects Edited!!!" });
});

exports.deleteprojects = catchAsynErrors(async (req, res, next) => {
  const student = await Student.findById(req.id).exec();
  const filteredprojects = await student.resume.projects.filter(
    (i) => i.id !== req.params.projectsid
  );

  student.resume.projects = filteredprojects;
  await student.save();
  res.json({ message: "projects Deleted !!!" });
});

exports.addskills = catchAsynErrors(async (req, res, next) => {
  const student = await Student.findById(req.id).exec();
  student.resume.skills.push({ ...req.body, id: uuidv4() });
  await student.save();
  res.json({ message: "skills Added!!!" });
});

exports.editskills = catchAsynErrors(async (req, res, next) => {
  const student = await Student.findById(req.id).exec();
  const skillsIndex = await student.resume.skills.findIndex(
    (i) => i.id === req.params.skillsid
  );

  student.resume.skills[skillsIndex] = {
    ...student.resume.skills[skillsIndex],
    ...req.body,
  };
  await student.save();
  res.json({ message: "skills Edited!!!" });
});

exports.deleteskills = catchAsynErrors(async (req, res, next) => {
  const student = await Student.findById(req.id).exec();
  const filteredskills = await student.resume.skills.filter(
    (i) => i.id !== req.params.skillsid
  );

  student.resume.skills = filteredskills;
  await student.save();
  res.json({ message: "skills Deleted !!!" });
});

exports.addaccomplishments = catchAsynErrors(async (req, res, next) => {
  const student = await Student.findById(req.id).exec();
  student.resume.accomplishments.push({ ...req.body, id: uuidv4() });
  await student.save();
  res.json({ message: "accomplishments Added!!!" });
});

exports.editaccomplishments = catchAsynErrors(async (req, res, next) => {
  const student = await Student.findById(req.id).exec();
  const accomplishmentsIndex = await student.resume.accomplishments.findIndex(
    (i) => i.id === req.params.accomplishmentsid
  );

  student.resume.accomplishments[accomplishmentsIndex] = {
    ...student.resume.accomplishments[accomplishmentsIndex],
    ...req.body,
  };
  await student.save();
  res.json({ message: "accomplishments Edited!!!" });
});

exports.deleteaccomplishments = catchAsynErrors(async (req, res, next) => {
  const student = await Student.findById(req.id).exec();
  const filteredaccomplishments = await student.resume.accomplishments.filter(
    (i) => i.id !== req.params.accomplishmentsid
  );

  student.resume.accomplishments = filteredaccomplishments;
  await student.save();
  res.json({ message: "accomplishments Deleted !!!" });
});
