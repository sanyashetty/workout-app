// models/Workout.mjs

import mongoose from "mongoose";

const WorkoutSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
	},
	user: {
		type: String,
		required: true,
	},
	exercises: [
		{
			type: mongoose.Schema.Types.ObjectId, //linking exercise and workout together
			ref: "Exercise",
			required: false,
		},
	],
});

const Workout = mongoose.model("workout", WorkoutSchema);

export default Workout;
