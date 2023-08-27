// models/Exercise.js

import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const UserSchema = new mongoose.Schema({
	username: {
		type: String,
		required: [true, "Your username is required"],
	},
	password: {
		type: String,
		required: [true, "Your password is required"],
	},
	email: {
		type: String,
		required: [true, "Your email address is required"],
	},
	workouts: [
		{
			type: mongoose.Schema.Types.ObjectId, //linking workout and user together
			ref: "Workout",
			required: false,
		},
	],
	// updatedDate: {
	// 	type: Date,
	// 	default: Date.now,
	// 	required: false,
	// },
});

UserSchema.pre("save", async function () {
	this.password = await bcrypt.hash(this.password, 12);
});

const User = mongoose.model("user", UserSchema);

export default User;
