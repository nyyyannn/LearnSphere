/*In an Express.js application, a "controller" refers to a part of your code
 that is responsible for handling-the-application's logic. Controllers are
 typically used to process incoming requests, interact with models (data sources),
 and send responses back to clients. They help organize your application by
 separating concerns and following the MVC (Model-View-Controller) design pattern.*/

/*An asynchronous function in JavaScript is a function that operates asynchronously 
via the async keyword and can use the await keyword to pause the execution of the function 
until a Promise is resolved or rejected.*/

const User = require("../models/user-model");
const bcrypt = require("bcryptjs");
const { use } = require("../router/auth-router");

//home page logic
const home = async(req, res) => {
    try
    {
        res
        .status(200)
        .send('Welcome to the website');
    }
    catch(error)
    {
        console.log(error);
    }
};

//register logic
const register = async(req,res) => {
    try
    {
        console.log(req.body);
        //Get registration data
        const {username, email, phone, password} = req.body;
        
        //Check if email already exists
        const userExist = await User.findOne({email})
        if(userExist)
        {
            return res.status(400).json({msg: "Email already exists"});
        }

        //creating if the email dosen't exist
        const userCreated = await User.create({username, email, phone, password});

        res.
        status(200).
        json({ msg: "Registration successful", 
               token: await userCreated.generateToken(),
               userId: userCreated._id.toString(), //converting to string is a good practice.
            });
    }
    catch(error)
    {
        res.status(500).json("Internal Server Error");
        //next(error);
    }
};

//login logic
const login = async (req, res) =>
    {
        try
        {
            const {email, password} = req.body;

            //check if user exists or not.
            const userExist = await User.findOne({email});//returns the entire details of the user.
            if(!userExist)
            {
                return res.status(400).json({message:"User does not exist"});
            }
            
            const user = await userExist.comparePassword(password);//comparing the password.
            
            if(user)
            {
                res.
                status(200).
                json({ 
                       msg: "Login successful", 
                       token: await userExist.generateToken(),
                       userId: userExist._id.toString(), 
                    });
            }
            else
            {
                res.status(400).json({message:"Invalid Credentials"})
            }
        
        } 
        catch(error)
        {
            next(error);
        }
    };

module.exports = {home, register, login};
