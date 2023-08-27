// routes/WorkoutRoutes.mjs
import express from "express";
import Workout from "../models/Workout.mjs";

const router = express.Router();

// @route GET api/workouts/test
// @description tests workouts route
// @access Public
router.get("/test", (req, res) => res.send("Workout route testing!"));

// @route GET api/workouts
// @description Get all workouts
// @access Public
router.get("/", (req, res) => {
	Workout.find()
		.then((workouts) => res.json(workouts))
		.catch((err) =>
			res.status(404).json({ noworkoutsfound: "No Workouts found" })
		);
});

// @route GET api/workouts/:id
// @description Get single workout by id
// @access Public
router.get("/by-id/:id", (req, res) => {
	Workout.findById(req.params.id)
		.then((workout) => res.json(workout))
		.catch((err) =>
			res.status(404).json({ noworkoutfound: "No Workout found" })
		);
});

// @route CREATE api/workouts
// @description add/save workout
// @access Public
router.post("/", (req, res) => {
	console.log(req.body);
	Workout.create(req.body)
		.then((workout) => res.json({ msg: "Workout added successfully" }))
		.catch((err) =>
			res.status(400).json({ error: "Unable to add this workout" })
		);
});

// @route UPDATE api/workouts/:id
// @description Update workout
// @access Public
router.put("/by-id/:id", (req, res) => {
	Workout.findByIdAndUpdate(req.params.id, req.body)
		.then((workout) => res.json({ msg: "Updated successfully" }))
		.catch((err) =>
			res.status(400).json({ error: "Unable to update the Database" })
		);
});

// @route DELETE api/workout/:id
// @description Delete workout by id
// @access Public
router.delete("/by-id/:id", (req, res) => {
	Workout.findByIdAndRemove(req.params.id, req.body)
		.then((workout) => res.json({ mgs: "Workout entry deleted successfully" }))
		.catch((err) => res.status(404).json({ error: "No such workout" }));
});

export default router;
