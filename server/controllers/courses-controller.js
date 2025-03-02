const Course = require("../models/course-model");

const courses = async (req, res) => {
    try {
        const response = await Course.find();
        
        if (response.length === 0) { 
            return res.status(404).json({ msg: "No courses found" });
        }

        res.status(200).json({msg:response});
    } catch (error) {
        console.error(`Courses error: ${error}`);
        res.status(500).json({ msg: "Internal Server Error" });
    }
};

const getCourseById = async (req, res, next) => {
    try {
        const { id } = req.params;
        
        const data = await Course.findById(id); 

        if (!data) {
            return res.status(404).json({ msg: "Course not found" });
        }

        res.status(200).json(data);
    } catch (error) {
        console.error(`Error fetching course by ID: ${error}`);
        next(error);
    }
};

module.exports = { courses, getCourseById };
