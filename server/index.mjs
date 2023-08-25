import express from "express";
import cors from "cors";
import "./loadEnvironment.mjs";
import exerciseRoutes from "./routes/exerciseRoutes.mjs";
import userRoutes from "./routes/userRoutes.mjs";
import workoutRoutes from "./routes/workoutRoutes.mjs";

const PORT = process.env.PORT || 5050;
const app = express();

app.use(cors());
app.use(express.json());

app.use("/exercises", exerciseRoutes);
app.use("/users", userRoutes);
app.use("/workouts", workoutRoutes);

// start the Express server
app.listen(PORT, () => {
	console.log(`Server is running on port: ${PORT}`);
});
