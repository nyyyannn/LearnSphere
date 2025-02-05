const jwt = require("jsonwebtoken");
const User = require("../models/user-model"); //contains user data

const authMiddleware = async (req, res, next) => //passing next is a must! to move to next middleware
{
    const token = req.header("Authorization"); //not headers* Authorization is the key part (check postman)

    //if you attempt to use an expired token, you'll receive an error.
    if(!token)
    {
        return res.
            status(401).
            json({message:"Unauthorized HTTP, token not provided"});
    }

    //Assuming token is in the format "Bearer <jwtToken>, removing the prefix"
    const jwtToken = token.replace("Bearer","").trim();

    try
    {
        const isVerified = jwt.verify(jwtToken, process.env.JWT_SECRET_KEY); //they should match (.verify is provided by jwttoken);
        
        const userData = await User.
                                findOne({ email : isVerified.email }).
                                select({ password: 0});//to check the collection and find a user with a matching email and remove the password from the data received
        console.log(userData);

        req.user = userData;
        req.token = token;
        req.userID = userData._id; //passing custom information in the request. To pass information between middleware functions.

        next();    
    }
    catch(error)
    {
        return res.
            status(401).
            json({message:"Unauthorized. Invalid token"});
    }
}

module.exports = authMiddleware;