const authMiddleware = require("../middlewares/auth-middleware"); //to get user data to check if he/she is an admin

const adminMiddleware = async (req, res, next) =>
{
    try
    {
        const adminRole = req.user.isAdmin; //extracts isAdmin from user Object
        if(!adminRole)
        {
            return res.status(403).json({message:"Acces Denied. User is not an admin."})
        }
        next(); //to proceed to next middleware if user is admin
    }
    catch(error)
    {
        next(error);
    }
}

module.exports = adminMiddleware;