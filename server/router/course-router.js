const express = require("express");
const router = express.Router();
const courseForm = require("../controllers/course-controller");

router.route("/addCourses").post(courseForm);

module.exports = router;