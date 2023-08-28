import React, { useContext, useState } from "react";
import axios from "axios";
import { UserContext } from "../contexts/UserContext";

const API_URL = process.env.REACT_APP_API_URL.replace(/[";]/g, "");

const WorkoutModal = ({ closeModal, currentWorkout = null }) => {
	const [workoutName, setWorkoutName] = useState(
		currentWorkout ? currentWorkout.name : ""
	);

	const [exerciseName, setExerciseName] = useState(""); // Name of the exercise
	const [sets, setSets] = useState(""); // Number of sets for the exercise
	const [reps, setReps] = useState(""); // Number of reps for the exercise
	const [weights, setWeights] = useState(""); // Number of reps for the exercise
	const [exercises, setExercises] = useState([]); // List of exercises

	const { userInfo, setUserInfo } = useContext(UserContext);

	const addExercise = () => {
		setExercises((prev) => [
			...prev,
			{
				name: exerciseName,
				user: userInfo?.username,
				sets: sets,
				reps: reps,
				weights: weights,
			},
		]);
		setExerciseName("");
		setSets("");
		setReps("");
		setWeights("");
	};

	const handleSubmit = async () => {
		try {
			const exerciseIds = [];
			for (const exercise of exercises) {
				const response = await axios.post(
					`${API_URL}/api/exercises/`,
					exercise
				);
				if (response.data && response.data.exerciseId) {
					exerciseIds.push(response.data.exerciseId);
				} else {
					throw new Error("Failed to save an exercise.");
				}
			}

			if (currentWorkout) {
				// Update the workout
				await axios.put(`${API_URL}/api/workouts/by-id/${currentWorkout._id}`, {
					name: workoutName,
				});
			} else {
				// Create a new workout
				const response = await axios.post(`${API_URL}/api/workouts/`, {
					name: workoutName,
					user: userInfo?.username,
					exercises: exerciseIds, // Note: This should now be the list of IDs
				});
				const newWorkoutId = response.data.workoutId;

				// Add the workout to the current user
				const currentWorkouts = userInfo.workouts || [];
				const updatedWorkouts = [...currentWorkouts, newWorkoutId];
				setUserInfo({ ...userInfo, workouts: updatedWorkouts });
				await axios.put(`${API_URL}/api/users/by-id/${userInfo?._id}`, {
					workouts: updatedWorkouts,
				});
			}

			// Close the modal and refresh data
			closeModal();
		} catch (error) {
			console.error("Failed to save the workout:", error);
			// Handle the error appropriately here (maybe show an error message to the user)
		}
	};

	return (
		<div className="fixed top-0 left-0 w-full h-full bg-opacity-50 bg-black flex items-center justify-center">
			<div className="bg-white p-8 rounded-lg w-96">
				<h2 className="text-2xl mb-4">
					{currentWorkout ? "Edit Workout" : "Add Workout"}
				</h2>
				<input
					className="w-full p-2 mb-4 border rounded"
					value={workoutName}
					onChange={(e) => setWorkoutName(e.target.value)}
					placeholder="Workout Name"
				/>
				{!currentWorkout && (
					<div className="mb-4">
						<input
							className="w-full p-2 mb-2 border rounded"
							value={exerciseName}
							onChange={(e) => setExerciseName(e.target.value)}
							placeholder="New Exercise"
						/>
						<input
							type="number"
							className="w-full p-2 mb-2 border rounded"
							value={sets}
							onChange={(e) => setSets(e.target.valueAsNumber)}
							placeholder="Sets"
						/>
						<input
							type="number"
							className="w-full p-2 mb-2 border rounded"
							value={reps}
							onChange={(e) => setReps(e.target.valueAsNumber)}
							placeholder="Reps"
						/>
						<input
							type="number"
							className="w-full p-2 mb-2 border rounded"
							value={weights}
							onChange={(e) => setWeights(e.target.valueAsNumber)}
							placeholder="Weight (lbs)"
						/>
						<button
							onClick={addExercise}
							className="mt-2 w-full bg-green-500 text-white py-1 px-2 rounded"
						>
							Add Exercise
						</button>
					</div>
				)}
				<ul>
					{exercises.map((ex, index) => (
						<li key={index} className="mb-2">
							{ex.name} - {ex.sets} Sets x {ex.reps} Reps, {ex.weights} lbs
						</li>
					))}
				</ul>
				<div className="mt-4">
					<button
						onClick={handleSubmit}
						className="bg-blue-500 text-white py-2 px-4 rounded mr-4"
					>
						{currentWorkout ? "Update" : "Add"}
					</button>
					<button
						onClick={closeModal}
						className="bg-gray-300 text-black py-2 px-4 rounded"
					>
						Cancel
					</button>
				</div>
			</div>
		</div>
	);
};

export default WorkoutModal;
