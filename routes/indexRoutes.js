const express = require("express");
const {
  Homepage,
  studentsignup,
  currentUser,
  studentsignin,
  studentsignout,
  studentsendmail,
  studentforgetlink,
  studentresetpassword,
  studentupdate,
  studentavatar,
  applyinternship,
  applyjob,
  studentdelete,
} = require("../controllers/indexController");
const { isAuthenticated } = require("../middlewares/auth");
const router = express.Router();

// Get
router.get("/", Homepage);

// Post / student
router.post("/student", isAuthenticated, currentUser);

// POST/student/signup

router.post("/student/signup", studentsignup);

// POST/student/signin

router.post("/student/signin", studentsignin);

// GET/student/signout

router.get("/student/signout", isAuthenticated, studentsignout);

// POST/student/send-mail

router.post("/student/send-mail", studentsendmail);

// GET//student/forget-link/studentId

router.get("/student/forget-link/:id", studentforgetlink);

// POST//student/reset-password/studentId

router.post(
  "/student/reset-password/:id",
  isAuthenticated,
  studentresetpassword
);

// POST//student/update/studentId

router.post("/student/update/:id", isAuthenticated, studentupdate);

// POST//student/update/studentId

router.post("/student/delete/:id", isAuthenticated, studentdelete);

// POST//student/avatar/studentId

router.post("/student/avatar/:id", isAuthenticated, studentavatar);

// ----------------------- Apply InternShip -------------------------

// POST//student/apply/internship/internshipid

router.post(
  "/student/apply/internship/:internshipid",
  isAuthenticated,
  applyinternship
);

// ----------------------- Apply Job -------------------------

// POST//student/avatar/job/jobid

router.post("/student/apply/job/:jobid", isAuthenticated, applyjob);

module.exports = router;
