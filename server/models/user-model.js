const mongoose = require("mongoose");
const {Schema, model} = mongoose;
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

//blueprint of the registration form
const userSchema = new Schema({
    username: {
        type:String,
        required:true,
    },
    email: {
        type: String,
        required: true,
        unique: true, //to ensure that no two users can have the same email
        lowercase: true, //to convert the email to lowercase
    },
    phone: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    isAdmin: {
        type: Boolean,
        default: false,
    }
});

//securing the password with bcrypt
userSchema.pre('save', async function(next){
    //console.log("pre method", this);
    const user = this; //current user object being saved(the one above)

    try
    {
        if(!user.isModified("password"))
        {
            return next();
        }
        const saltRound = await bcrypt.genSalt(10); //higher the value, the more complex and time consuming.
        const hash_password = await bcrypt.hash(user.password, saltRound);
        user.password = hash_password;
    }
    catch(error)
    {
        next(error);
    }
});

/*JWT (JSON Web Token): Is an open standard (RFC 7519) that defines a compact
       and self-contained way for securely transmitting information
       between parties as a JSON object. Mainly used for authorization 
       and authentication.*/

/*Structure of JWT: 
    Header: Contains metadata about the token.
    Payload: Contains claims(eg: user-id, username, etc) about an entity.
    Signature: To verify that the sender of the JWT is who it says it is.
    */

/* JWTs are not stored in the database along with other user details. 
   Instead, they are issued by the server during the authentication process
   and then stored on the client-side.*/  


//an instance method (userSchema.methods.func_name)
userSchema.methods.generateToken = async function ()
{
    try
    {
        //pass the payload
        return jwt.sign({
            userId: this._id.toString(),
            email: this.email,
            isAdmin: this.isAdmin //payload
        },
            process.env.JWT_SECRET_KEY,
            {
                expiresIn: "30d",
            }       
        );
    }
    catch(error)
    {
        console.error(error);
    }

};

//comparing the password
userSchema.methods.comparePassword = async function (password)
{
    return bcrypt.compare(password, this.password);
};


//defining a new collection named user with the structure defined in userSchema variable
const User = model("User", userSchema); //Always have singular form of the collection on mongoDB.
module.exports = User;
