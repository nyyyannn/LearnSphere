// express.Router class:

/* In Express.js, express.Router() is a mini Express application 
without all the server configurations but with the ability to define routes, middleware, and even have 
its own set of route handlers. 
It allows you to modularize your routes and middleware to keep your code organized and maintainable.*/

/*Use the express.Router class to create modular, mountable route handlers. A Router instance is a complete middleware and routing system. 
For this reason, it is often referred to as a "mini-app".*/

const express = require("express");
const router = express.Router(); //Creating an instance of the Router class. 
const authControllers = require("../controllers/auth-controller");
const signupSchema = require("../validators/auth-validator");
const loginSchema = require("../validators/login-validator");
const validate = require('../middlewares/validate-middleware');
const authMiddleware = require("../middlewares/auth-middleware");

router.route("/").get(authControllers.home);
/*(req,res) => { 
    res
    .status(200)
    .send('Welcome to the website');
}); */

router
.route("/register")
.post(validate(signupSchema),authControllers.register);//using post sends the data to the database
router.route("/login").post(validate(loginSchema),authControllers.login);

router.route("/user").get(authMiddleware, authControllers.user);

module.exports = router;//If we want to use the module in another file, we include this statement.
