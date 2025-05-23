//this router handles all routes associated with the admin. For example: api/admin/{users||contact}
const express = require("express");

const {getAllUsers, getCourseById, updateCourseById, deleteCourseById} = require("../controllers/admin-controller");
const {getAllMessages} = require("../controllers/admin-controller");
const {getAllCourses} = require("../controllers/admin-controller");
const {deleteUserById} = require("../controllers/admin-controller");
const {getUserById} = require("../controllers/admin-controller");
const {updateUserById} = require("../controllers/admin-controller");
const {deleteContactById} = require("../controllers/admin-controller");

const authMiddleware = require("../middlewares/auth-middleware");
const adminMiddleware = require("../middlewares/admin-middleware");

const router = express.Router();

router.route("/users").get(authMiddleware, adminMiddleware, getAllUsers); //adding authMiddleware ensures the route doesn't work until a token is provided
router.route("/contact").get(authMiddleware, adminMiddleware, getAllMessages); //same as user
router.route("/courses").get(authMiddleware, adminMiddleware, getAllCourses);
router.route("/courses/:id").get(authMiddleware, adminMiddleware, getCourseById);
router.route("/users/:id").get(authMiddleware, adminMiddleware, getUserById )
router.route("/users/delete/:id").delete(authMiddleware, adminMiddleware, deleteUserById);
router.route("/users/update/:id").patch(authMiddleware, adminMiddleware, updateUserById);
router.route("/courses/update/:id").patch(authMiddleware, adminMiddleware, updateCourseById);
router.route("/courses/delete/:id").delete(authMiddleware, adminMiddleware, deleteCourseById);
router.route("/contact/delete/:id").delete(authMiddleware, adminMiddleware, deleteContactById);

module.exports = router;