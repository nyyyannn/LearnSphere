const User = require("../models/user-model"); 
const Contact = require("../models/contact-model");
const Course = require("../models/course-model");

//to get all the users from the database, the following function is used
const getAllUsers = async (req, res, next) =>
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

const getAllCourses = async( req, res, next) =>
{
    try
    {
        const courses = await Course.find();
        if(!courses||courses.length===0)
        {
            return res.status(404).json({message:"No courses found"});
        }
        return res.status(200).json(courses);
    }
    catch(error)
    {
        next(error);
    }
}

//to get all the contact from the database
const getAllMessages = async(req, res, next) =>
{
    try
    {
        const messages = await Contact.find();
        if(!messages || messages.length ===0 )
        {
            return res.status(404).json({message:"No messages found"});
        }
        return res.status(200).json(messages);
    }
    catch(error)
    {
        next(error);
    }
}

const getUserById = async(req, res, next) =>
{
    try
    {
        const id = req.params.id;
        const data = await User.findOne({_id:id}).select("-password");
        return res.status(200).json(data);
    }
    catch(error)
    {
        next(error);
    }
}

const getCourseById = async(req, res, next) =>
{
    try
    {
        const id = req.params.id;
        const data = await Course.findOne({_id:id});
        return res.status(200).json(data);
    }
    catch(error)
    {
        next(error);
    }
}

const deleteUserById = async (req, res, next) =>
{
    try
    {
        const id = req.params.id; //because the url has the id, we use this (check admin router URL defined for deleting a user)
        await User.deleteOne({_id:id});
        return res.status(200).json({message: "User deleted Successfully"});
    }
    catch(error)
    {
        next(error);
    }
}

const updateUserById = async(req, res, next) =>
{
    try
    {
        const id = req.params.id;
        const updateUserData = req.body;  //contains user data

        const updatedUser = await User.updateOne({_id:id},{ $set: updateUserData}) //format of updateOne: updateOne.({filter},$set:{existingField: newValue})

        return res.status(200).json(updatedUser);
    }
    catch(error)
    {
        next(error);
    }
}

const updateCourseById = async(req, res, next) =>
{
    try
    {
        const id = req.params.id;
        const updateCourseData = req.body;
        const updatedCourse = await Course.updateOne({_id:id},{ $set: updateCourseData}) //format of updateOne: updateOne.({filter},$set:{existingField: newValue})

        return res.status(200).json(updatedCourse);
    }
    catch(error)
    {
        next(error);
    }
}

const deleteContactById = async (req, res, next) =>
{
    try
    {
        const id = req.params.id; //because the url has the id, we use this (check admin router URL defined for deleting a user)
        await Contact.deleteOne({_id:id});
        return res.status(200).json({message: "Message deleted successfully"});
    }
    catch(error)
    {
        next(error);
    }
}

const deleteCourseById = async (req, res, next) =>
{
    try
    {
        const id = req.params.id;
        await Course.deleteOne({_id:id});
        return res.status(200).json({message:" Course deleted successfully"});
    }
    catch(error)
    {
        next(error);
    }
}

module.exports = { getAllUsers, getAllMessages, getAllCourses, getCourseById, deleteUserById, deleteContactById, deleteCourseById, getUserById, updateUserById, updateCourseById} ;