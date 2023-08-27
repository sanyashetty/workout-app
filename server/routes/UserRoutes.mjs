// routes/UserRoutes.mjs
import express from "express";
import User from "../models/User.mjs";
import { Signup, Login, Logout } from "../controllers/UserAuthController.mjs";
import UserVerification from "../middlewares/UserAuthMiddleware.mjs";

const router = express.Router();

// @route GET api/users/test
// @description tests users route
// @access Public
router.get("/test", (req, res) => res.send("User route testing!"));

// @route GET api/users
// @description Get all users
// @access Public
router.get("/", (req, res) => {
	User.find()
		.then((users) => res.json(users))
		.catch((err) => res.status(404).json({ nousersfound: "No Users found" }));
});

// @route GET api/users/:id
// @description Get single user by id
// @access Public
router.get("/by-id/:id", (req, res) => {
	User.findById(req.params.id)
		.then((user) => res.json(user))
		.catch((err) => res.status(404).json({ nouserfound: "No User found" }));
});

// @route POST api/users
// @description sign up a new user
// @access Public
router.post("/signup", Signup);

// @route LOGIN api/users
// @description log in as a user
// @access Public
router.post("/login", Login);

// @route LOGOUT api/users
// @description log out as a user
// @access Public
router.post("/logout", Logout);

router.post("/verify-user", UserVerification);

// @route GET api/users/:id
// @description Update user
// @access Public
router.put("/by-id/:id", (req, res) => {
	User.findByIdAndUpdate(req.params.id, req.body)
		.then((user) => res.json({ msg: "Updated successfully" }))
		.catch((err) =>
			res.status(400).json({ error: "Unable to update the Database" })
		);
});

// @route GET api/users/:id
// @description Delete user by id
// @access Public
router.delete("/by-id/:id", (req, res) => {
	User.findByIdAndRemove(req.params.id, req.body)
		.then((user) => res.json({ mgs: "User deleted successfully" }))
		.catch((err) => res.status(404).json({ error: "No such user" }));
});

export default router;
