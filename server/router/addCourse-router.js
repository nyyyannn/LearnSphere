const express = require("express");
const router = express.Router();
const addCourseForm = require("../controllers/addCourse-controller");

router.route("/addCourses").post(addCourseForm);

module.exports = router;