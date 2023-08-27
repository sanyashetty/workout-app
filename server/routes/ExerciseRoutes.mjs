// routes/ExerciseRoutes.mjs
import express from "express";
import Exercise from "../models/Exercise.mjs";

const router = express.Router();

// @route GET api/exercises/test
// @description tests exercises route
// @access Public
router.get("/test", (req, res) => res.send("Exercise route testing!"));

// @route GET api/exercises
// @description Get all exercises
// @access Public
router.get("/", (req, res) => {
	Exercise.find()
		.then((exercises) => res.json(exercises))
		.catch((err) =>
			res.status(404).json({ noexercisesfound: "No Exercises found" })
		);
});

// @route GET api/exercises/:id
// @description Get single exercise by id
// @access Public
router.get("/by-id/:id", (req, res) => {
	Exercise.findById(req.params.id)
		.then((exercise) => res.json(exercise))
		.catch((err) =>
			res.status(404).json({ noexercisefound: "No Exercise found" })
		);
});

// @route POST api/exercises
// @description add/save exercise
// @access Public
router.post("/", (req, res) => {
	console.log(req.body);
	Exercise.create(req.body)
		.then((exercise) =>
			res.json({ msg: "Exercise added successfully", exerciseId: exercise._id })
		)
		.catch((err) =>
			res.status(400).json({ error: "Unable to add this exercise" })
		);
});

// @route UPDATE api/exercises/:id
// @description Update exercise
// @access Public
router.put("/by-id/:id", (req, res) => {
	Exercise.findByIdAndUpdate(req.params.id, req.body)
		.then((exercise) => res.json({ msg: "Updated successfully" }))
		.catch((err) =>
			res.status(400).json({ error: "Unable to update the Database" })
		);
});

// @route DELETE api/exercises/:id
// @description Delete exercise by id
// @access Public
router.delete("/by-id/:id", (req, res) => {
	Exercise.findByIdAndRemove(req.params.id, req.body)
		.then((exercise) =>
			res.json({ mgs: "Exercise entry deleted successfully" })
		)
		.catch((err) => res.status(404).json({ error: "No such exercise" }));
});

export default router;
