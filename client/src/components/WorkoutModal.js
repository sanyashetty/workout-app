import React, { useState } from "react";
import axios from "axios";

const WorkoutModal = ({ isModalOpen, closeModal, currentWorkout = null }) => {
	const [workoutName, setWorkoutName] = useState(
		currentWorkout ? currentWorkout.name : ""
	);

	const handleSubmit = async () => {
		if (currentWorkout) {
			// Update the workout
			await axios.put(`/api/workouts/${currentWorkout.id}`, {
				name: workoutName,
			});
		} else {
			// Create a new workout
			await axios.post("/api/workouts", { name: workoutName });
		}

		// Close the modal and refresh data
		closeModal();
	};

	return (
		isModalOpen && (
			<div className="modal">
				<h2>{currentWorkout ? "Edit Workout" : "Add Workout"}</h2>
				<input
					value={workoutName}
					onChange={(e) => setWorkoutName(e.target.value)}
					placeholder="Workout Name"
				/>
				<button onClick={handleSubmit}>
					{currentWorkout ? "Update" : "Add"}
				</button>
				<button onClick={closeModal}>Cancel</button>
			</div>
		)
	);
};

export default WorkoutModal;
