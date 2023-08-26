// models/Workout.mjs

import mongoose from "mongoose";

const WorkoutSchema = new mongoose.Schema({
	title: {
		type: String,
		required: true,
	},
	author: {
		type: String,
		required: true,
	},
	updatedDate: {
		type: Date,
		default: Date.now,
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
