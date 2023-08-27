// models/Exercise.mjs

import mongoose from "mongoose";

const ExerciseSchema = new mongoose.Schema({
	title: {
		type: String,
		required: true,
	},
	author: {
		type: String,
		required: true,
	},
	targetGroup: {
		type: String,
		required: false,
	},
	equipmentType: {
		type: String,
		required: false,
	},
	sets: {
		type: Number,
		required: false,
	},
	reps: {
		type: Number,
		required: false,
	},
	// updatedDate: {
	// 	type: Date,
	// 	default: Date.now,
	// 	required: true,
	// },
});

const Exercise = mongoose.model("exercise", ExerciseSchema);

export default Exercise;
