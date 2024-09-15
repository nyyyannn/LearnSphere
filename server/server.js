require('dotenv').config(); //Must be included when using env. MUST be placed at the first
const express = require("express"); //imports the express module
const app = express(); //creating an instance of express application
const authRoute = require("./router/auth-router"); //imports router at the specified location
const contactRoute = require("./router/contact-router");
const connectDb = require("./utils/db");
const errorMiddleware = require("./middlewares/error-middleware");

app.use(express.json()); /*This line of code adds Express middleware (functions that run between the request 
from the client and the response from the server). that parses incoming request bodies with JSON 
payloads. It's important to place this before any routes that need to handle JSON data 
in the request body. This middleware is responsible for parsing JSON data from requests, 
and it should be applied at the beginning of your middleware stack to ensure it's available
for all subsequent route handlers. express.json() is the middleware here.*/


//Mount the router: To use the router in your main Express app, you can "mount" it at specific URL prefix.
app.use("/api/auth",authRoute); /*Method in express used to mount middleware functions at specific path.
"/api/auth" is the base URl where the router will be mounted.*/
 
app.use("/api/form", contactRoute);

/*app.get("/", (req,res) => { 
    res.status(200).send('Welcome');
}); 
Sets up a route handler for HTTP GET request. '/' defines the route path.
(req,res): arrow fucntion handling the request and constructing the response.*/


/*Adding error-handling middleware to the middleware stack.
  Middleware functions are executed in the order they are added*/
app.use(errorMiddleware);

const PORT = 5000;
//starts the server and sends a message if it was successful. 

connectDb().then(() => { //only if the connection is succesful with the database, start the server.
    app.listen(PORT, () => {
    console.log(`Server is running at port: ${PORT}`);
    });
}); 