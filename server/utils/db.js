const mongoose = require("mongoose"); //variable stores all the methods present in mongoose

//const URI = "mongodb://127.0.0.1:27017/mern_admin"; //from command line 
//mongoose.connect(URI);

const URI = process.env.MONGODB_URI; //instead of a link we use this.

const connectDb = async() => {
    try 
    {
        await mongoose.connect(URI);
    } 
    catch(error)
    {
        console.error("Database connection failed");
        process.exit(0);
    }
}

module.exports = connectDb;