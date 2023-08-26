import express from "express";
import cors from "cors";
import "./loadEnvironment.mjs";
import ExerciseRoutes from "./routes/ExerciseRoutes.mjs";
import UserRoutes from "./routes/UserRoutes.mjs";
import WorkoutRoutes from "./routes/WorkoutRoutes.mjs";
import connectDB from "./db/conn.mjs";

const PORT = process.env.PORT || 5050;
const app = express();

connectDB();

app.use(cors());
app.use(express.json());

app.use("/api/exercises", ExerciseRoutes);
app.use("/api/users", UserRoutes);
app.use("/api/workouts", WorkoutRoutes);

// start the Express server
app.listen(PORT, () => {
	console.log(`Server is running on port: ${PORT}`);
});
