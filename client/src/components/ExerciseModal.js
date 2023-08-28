import React, { useState, useContext } from "react";
import { UserContext } from "../contexts/UserContext";
import axios from "axios";
const API_URL = process.env.REACT_APP_API_URL.replace(/[";]/g, "");

const ExerciseModal = ({ closeModal, workoutId, currentExercise = null }) => {
	const [exerciseName, setExerciseName] = useState(
		currentExercise ? currentExercise.name : ""
	);
	const [sets, setSets] = useState(currentExercise ? currentExercise.sets : "");
	const [reps, setReps] = useState(currentExercise ? currentExercise.reps : "");
	const [weights, setWeights] = useState(
		currentExercise ? currentExercise.weights : ""
	);

	const { userInfo, setUserInfo } = useContext(UserContext);

	const handleSubmit = async () => {
		const exerciseData = {
			name: exerciseName,
			user: userInfo?.username,
			sets,
			reps,
			weights,
		};

		if (currentExercise) {
			// Update the exercise
			await axios.put(
				`${API_URL}/api/exercises/by-id/${currentExercise._id}`,
				exerciseData
			);
		} else {
			// Create a new exercise
			const response = await axios.post(
				`${API_URL}/api/exercises/`,
				exerciseData
			);

			const exerciseId = response.data.exerciseId;

			if (workoutId) {
				const workoutResponse = await axios.get(
					`${API_URL}/api/workouts/by-id/${workoutId}`
				);
				const workout = workoutResponse.data;

				const currentExercises = workout.exercises || [];
				const updatedExercises = [...currentExercises, exerciseId];

				// Update the workout on the server

				await axios.put(`${API_URL}/api/workouts/by-id/${workoutId}`, {
					exercises: updatedExercises,
				});
			}
		}

		// Close the modal and refresh data
		closeModal();
	};

	return (
		<div className="fixed top-0 left-0 w-full h-full bg-opacity-50 bg-black flex items-center justify-center">
			<div className="bg-white p-8 rounded-lg w-96">
				<h2 className="text-2xl mb-4">
					{currentExercise ? "Edit Exercise" : "Add Exercise"}
				</h2>
				{/* ... (other input fields, styled similar to above) */}
				<input
					className="w-full p-2 mb-4 border rounded"
					value={exerciseName}
					onChange={(e) => setExerciseName(e.target.value)}
					placeholder="Exercise Name"
				/>
				<input
					className="w-full p-2 mb-4 border rounded"
					value={sets}
					onChange={(e) => setSets(e.target.value)}
					placeholder="Sets"
				/>
				<input
					className="w-full p-2 mb-4 border rounded"
					value={reps}
					onChange={(e) => setReps(e.target.value)}
					placeholder="Reps"
				/>
				<input
					className="w-full p-2 mb-4 border rounded"
					value={weights}
					onChange={(e) => setWeights(e.target.value)}
					placeholder="Weight (lbs)"
				/>

				<button
					onClick={handleSubmit}
					className="bg-blue-500 text-white py-2 px-4 rounded mr-4"
				>
					{currentExercise ? "Update" : "Add"}
				</button>
				<button
					onClick={closeModal}
					className="bg-gray-300 text-black py-2 px-4 rounded"
				>
					Cancel
				</button>
			</div>
		</div>
	);
};

export default ExerciseModal;
