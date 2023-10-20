const express = require("express");
const {
  Homepage,
  employesignup,
  currentemploye,
  employesignin,
  employesignout,
  employesendmail,
  employeforgetlink,
  employeresetpassword,
  employeupdate,
  employeavatar,
  createinternship,
  readinternship,
  readsingleinternship,
  createjob,
  readjob,
  readsinglejob,
  employedelete,
} = require("../controllers/employeController");
const { isAuthenticated } = require("../middlewares/auth");
const router = express.Router();

// Get
router.get("/",Homepage);

// Post / student
router.post("/current", isAuthenticated,currentemploye);

// POST/student/signup

router.post("/signup", employesignup);

// POST/employe/signin

router.post("/signin", employesignin);

// GET/employe/signout

router.get("/signout", isAuthenticated,employesignout);

// POST/employe/send-mail

router.post("/send-mail",employesendmail);

// GET//employe/forget-link/employeId

router.get("/forget-link/:id", employeforgetlink);

// POST//employe/reset-password/employeId

router.post("/reset-password/:id",isAuthenticated,employeresetpassword);

// POST//employe/update/employeId

router.post("/update/:id",isAuthenticated,employeupdate);

// POST//employe/delete/employeId

router.post("/delete/:id",isAuthenticated,employedelete);



// POST//employe/avatar/employeId

router.post("/avatar/:id",isAuthenticated,employeavatar);


// ----------------------  INTERNSHIP ROUTES --------------------------

// POST//employe/internship/create

router.post("/internship/create",isAuthenticated,createinternship);


// POST//employe/internship/read

router.post("/internship/read",isAuthenticated,readinternship);


// POST//employe/internship/read/:id

router.post("/internship/read/:id",isAuthenticated,readsingleinternship);



// ----------------------  JOB ROUTES --------------------------

// POST//employe/job/create

router.post("/job/create",isAuthenticated,createjob);


// POST//employe/job/read

router.post("/job/read",isAuthenticated,readjob);


// POST//employe/job/read/:id

router.post("/job/read/:id",isAuthenticated,readsinglejob);



module.exports = router;
 