import User from "../models/User.mjs";
import createSecretToken from "../util/SecretToken.mjs";
import bcrypt from "bcryptjs";

export async function Signup(req, res, next) {
	try {
		const { email, password, username, createdAt } = req.body;
		const existingUser = await User.findOne({ email });
		if (existingUser) {
			return res.json({ message: "User with this email already exists" });
		}
		const user = await User.create({ email, password, username, createdAt });
		const token = createSecretToken(user._id);
		res.cookie("token", token, {
			withCredentials: true,
			httpOnly: false,
		});
		res
			.status(201)
			.json({ message: "User signed in successfully", success: true, user });
		next();
	} catch (error) {
		console.error(error);
	}
}

export async function Login(req, res, next) {
	try {
		const { email, password } = req.body;
		if (!email || !password) {
			return res.json({ message: "All fields are required" });
		}
		const user = await User.findOne({ email });
		if (!user) {
			return res.json({ message: "Incorrect password or email" });
		}
		const auth = await bcrypt.compare(password, user.password);
		if (!auth) {
			return res.json({ message: "Incorrect password or email" });
		}
		const token = createSecretToken(user._id);
		res.cookie("token", token, {
			withCredentials: true,
			httpOnly: false,
		});
		res
			.status(201)
			.json({ message: "User logged in successfully", success: true });
		next();
	} catch (error) {
		console.error(error);
	}
}
