const User = require("../models/user-model"); 
const Contact = require("../models/contact-model");

//to get all the users from the database, the following function is used
const getAllUsers = async (req, res) =>
{
    try
    {
        const users = await User.find().select("-password"); // to retrieve the users data from the database
        if(!users||users.length === 0)
        {
            return res.status(404).json({message: "No Users found"});
        }
        return res.status(200).json(users);        
    }                                
    catch(error)
    {
        next(error);
    }
}

const getAllMessages = async(req, res) =>
{
    try
    {
        const messages = await Contact.find();
        if(!messages || messages.length ===0 )
        {
            return res.status(404).json({message:"No messages found"});
        }
        return res.status(200).json(messages)
    }
    catch(error)
    {
        next(error);
    }
}

module.exports = { getAllUsers, getAllMessages} ;