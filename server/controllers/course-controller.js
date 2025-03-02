const Course = require("../models/course-model");

const courseForm = async(req, res) =>
{
    try
    {
        const response = req.body;
        await Course.create(response);
        return res.status(200).json({message: "Course posted successfully"});
    }
    catch(error)
    {
        return res.status(500).json({message:"Error posting course"});
    }
};

module.exports = courseForm;