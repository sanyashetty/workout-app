import express from "express";
import cors from "cors";
import "./loadEnvironment.mjs";
import ExerciseRoutes from "./routes/ExerciseRoutes.mjs";
import UserRoutes from "./routes/UserRoutes.mjs";
import WorkoutRoutes from "./routes/WorkoutRoutes.mjs";
import QuoteRoutes from "./routes/QuoteRoutes.mjs";
import connectDB from "./db/conn.mjs";
import cookieParser from "cookie-parser";

const PORT = process.env.PORT || 5050;
const app = express();

connectDB();

app.use(
	cors({
		origin: "http://localhost:3000",
		credentials: true,
	})
);
app.use(express.json());
app.use(cookieParser());

app.use("/api/exercises", ExerciseRoutes);
app.use("/api/users", UserRoutes);
app.use("/api/workouts", WorkoutRoutes);
app.use("/api/quotes", QuoteRoutes);

// start the Express server
app.listen(PORT, () => {
	console.log(`Server is running on port: ${PORT}`);
});
