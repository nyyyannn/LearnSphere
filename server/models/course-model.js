const mongoose = require("mongoose");
const {Schema, model} = mongoose;

const courseSchema = new Schema(
    {
        name: {type: String, required: true},
        duration: {type: String, required: true},
        description: {type: String, required: true},
        level: {type: String, required: true},
        url: {type:String, required: true},
        syllabus: {type: String, required: true},
        prerequisites: {type: String, required: true},
        user:{type: String, required: true},
    }
);

const Course = model('Course',courseSchema);
module.exports = Course;