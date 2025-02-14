//this router handles all routes associated with the admin. For example: api/admin/{users||contact}
const express = require("express");

const {getAllUsers} = require("../controllers/admin-controller");
const {getAllMessages} = require("../controllers/admin-controller");

const authMiddleware = require("../middlewares/auth-middleware");

const router = express.Router();

router.route("/users").get(authMiddleware, getAllUsers); //adding authMiddleware ensures the route doesn't work until a token is provided
router.route("/contact").get(authMiddleware, getAllMessages); //same as user

module.exports = router;