const mongoose = require("mongoose");
const { Schema,  model } = mongoose;

const serviceSchema = new Schema(
    {
        service: {type: String, required:true},
        description: {type: String, required: true}
    }
);

const Service = model("Service",serviceSchema);
module.exports = Service;