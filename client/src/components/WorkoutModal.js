import React, { useState } from "react";
import axios from "axios";
const API_URL = process.env.REACT_APP_API_URL.replace(/[";]/g, "");

const WorkoutModal = ({ closeModal, currentWorkout = null }) => {
	const [workoutName, setWorkoutName] = useState(
		currentWorkout ? currentWorkout.name : ""
	);

	const handleSubmit = async () => {
		if (currentWorkout) {
			// Update the workout
			await axios.put(`${API_URL}/api/workouts/${currentWorkout.id}`, {
				name: workoutName,
			});
		} else {
			// Create a new workout
			await axios.post(`${API_URL}/api/workouts`, { name: workoutName });
		}

		// Close the modal and refresh data
		closeModal();
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
	);
};

export default WorkoutModal;

// prompt adding number exercises, add exercises, add workout
