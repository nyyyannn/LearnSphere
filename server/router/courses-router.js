const express = require("express");
const router = express.Router();
const {courses, getCourseById} = require("../controllers/courses-controller");

router.route("/courses").get(courses);
router.route("/courses/:id").get(getCourseById);

module.exports = router;