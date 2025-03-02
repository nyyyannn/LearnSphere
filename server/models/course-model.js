const mongoose = require("mongoose");
const {Schema, model} = mongoose;

const courseSchema = new Schema(
    {
        name: {type: String, required: true},
        duration: {type: String, required: true},
        description: {type: String, required: true},
        level: {type: String, required: true},
    }
);

const Course = model('Course',courseSchema);
module.exports = Course;