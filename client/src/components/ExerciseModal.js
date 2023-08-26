import React, { useState } from "react";
import axios from "axios";

const ExerciseModal = ({
	isModalOpen,
	closeModal,
	workoutId,
	currentExercise = null,
}) => {
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
				`/api/workouts/${workoutId}/exercises/${currentExercise.id}`,
				exerciseData
			);
		} else {
			// Create a new exercise
			await axios.post(`/api/workouts/${workoutId}/exercises`, exerciseData);
		}

		// Close the modal and refresh data
		closeModal();
	};

	return (
		isModalOpen && (
			<div className="modal">
				<h2>{currentExercise ? "Edit Exercise" : "Add Exercise"}</h2>
				<input
					value={exerciseName}
					onChange={(e) => setExerciseName(e.target.value)}
					placeholder="Exercise Name"
				/>
				<input
					value={sets}
					onChange={(e) => setSets(e.target.value)}
					placeholder="Sets"
				/>
				<input
					value={reps}
					onChange={(e) => setReps(e.target.value)}
					placeholder="Reps"
				/>
				<input
					value={weight}
					onChange={(e) => setWeight(e.target.value)}
					placeholder="Weight (kg)"
				/>
				<button onClick={handleSubmit}>
					{currentExercise ? "Update" : "Add"}
				</button>
				<button onClick={closeModal}>Cancel</button>
			</div>
		)
	);
};

export default ExerciseModal;
