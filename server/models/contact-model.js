const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const contactSchema = new Schema(
    {
        username: {type: String, required: true},
        email: {type: String, required: true},
        message: {type: String, required: true},
    }
);

//creating a collection
const Contact = model('Contact',contactSchema);
module.exports = Contact;