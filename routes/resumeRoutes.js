const express = require("express");
const router = express.Router();
const {
  resume,
  addeducation,
  editeducation,
  deleteeducation,
  addjob,
  editjob,
  deletejob,
  addinternship,
  editinternship,
  deleteinternship,
  addresponsibilities,
  editresponsibilities,
  deleteresponsibilities,
  addcourses,
  editcourses,
  deletecourses,
  addprojects,
  editprojects,
  deleteprojects,
  addskills,
  editskills,
  deleteskills,
  addaccomplishments,
  editaccomplishments,
  deleteaccomplishments,
} = require("../controllers/resumeController");
const { isAuthenticated } = require("../middlewares/auth");

// Get
router.get("/", isAuthenticated,resume);

// POST
router.get("/add-edu", isAuthenticated,addeducation);

// POST
router.post("/edit-edu/:eduid", isAuthenticated, editeducation);

// POST
router.post("/delete-edu/:eduid", isAuthenticated, deleteeducation);

// POST
router.post("/add-job", isAuthenticated, addjob);

// POST
router.post("/edit-job/:jobid", isAuthenticated, editjob);

// POST
router.post("/delete-job/:jobid", isAuthenticated, deletejob);

// POST
router.post("/add-internship", isAuthenticated, addinternship);

// POST
router.post("/edit-internship/:internshipid", isAuthenticated, editinternship);

// POST
router.post("/delete-internship/:internshipid", isAuthenticated, deleteinternship);


// POST
router.post("/add-responsibilities", isAuthenticated, addresponsibilities);

// POST
router.post("/edit-responsibilities/:responsibilitieid", isAuthenticated, editresponsibilities);

// POST
router.post("/delete-responsibilities/:responsibilitieid", isAuthenticated, deleteresponsibilities);


// POST
router.post("/add-courses", isAuthenticated, addcourses);

// POST
router.post("/edit-courses/:coursesid", isAuthenticated, editcourses);

// POST
router.post("/delete-courses/:coursesid", isAuthenticated, deletecourses);


// POST
router.post("/add-projects", isAuthenticated, addprojects);

// POST
router.post("/edit-projects/:projectsid", isAuthenticated, editprojects);

// POST
router.post("/delete-projects/:projectsid", isAuthenticated, deleteprojects);


// POST
router.post("/add-skills", isAuthenticated, addskills);

// POST
router.post("/edit-skills/:skillsid", isAuthenticated, editskills);

// POST
router.post("/delete-skills/:skillsid", isAuthenticated, deleteskills);


// POST
router.post("/add-accomplishments", isAuthenticated, addaccomplishments);

// POST
router.post("/edit-accomplishments/:accomplishmentsid", isAuthenticated, editaccomplishments);

// POST
router.post("/delete-accomplishments/:accomplishmentsid", isAuthenticated, deleteaccomplishments);


module.exports = router;
