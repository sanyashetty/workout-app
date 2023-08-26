// models/Exercise.js

import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
	username: {
		type: String,
		required: true,
	},
	password: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		required: true,
	},
	workouts: [
		{
			type: mongoose.Schema.Types.ObjectId, //linking workout and user together
			ref: "Workout",
			required: false,
		},
	],
	exercises: [
		{
			type: mongoose.Schema.Types.ObjectId, //linking exercise and user together
			ref: "Exercise",
			required: false,
		},
	],
	updatedDate: {
		type: Date,
		default: Date.now,
		required: true,
	},
});

const User = mongoose.model("user", UserSchema);

export default User;
