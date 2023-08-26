import mongoose from "mongoose";

const connectionString = process.env.ATLAS_URI || "";

async function connectDB() {
	try {
		mongoose.set("strictQuery", true);
		await mongoose.connect(connectionString, {
			useNewUrlParser: true,
		});

		console.log("MongoDB is Connected...");
	} catch (err) {
		console.error(err.message);
		process.exit(1);
	}
}

export default connectDB;
