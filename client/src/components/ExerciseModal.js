import React, { useState } from "react";
import axios from "axios";
const API_URL = process.env.REACT_APP_API_URL.replace(/[";]/g, "");

const ExerciseModal = ({ closeModal, workoutId, currentExercise = null }) => {
	const [exerciseName, setExerciseName] = useState(
		currentExercise ? currentExercise.name : ""
	);
	const [sets, setSets] = useState(currentExercise ? currentExercise.sets : "");
	const [reps, setReps] = useState(currentExercise ? currentExercise.reps : "");
	const [weight, setWeight] = useState(
		currentExercise ? currentExercise.weight : ""
	);

	const handleSubmit = async () => {
		const exerciseData = { name: exerciseName, sets, reps, weight };

		if (currentExercise) {
			// Update the exercise
			await axios.put(
				`${API_URL}/api/workouts/${workoutId}/exercises/${currentExercise.id}`,
				exerciseData
			);
		} else {
			// Create a new exercise
			await axios.post(
				`${API_URL}/api/workouts/${workoutId}/exercises`,
				exerciseData
			);
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
					value={weight}
					onChange={(e) => setWeight(e.target.value)}
					placeholder="Weight (kg)"
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
