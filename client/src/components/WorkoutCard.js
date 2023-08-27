import React, { useState } from "react";
import WorkoutModal from "./WorkoutModal";
import ExerciseModal from "./ExerciseModal";
import axios from "axios";
const API_URL = process.env.REACT_APP_API_URL.replace(/[";]/g, "");

const WorkoutCard = ({ workout, inTracker, inCatalog }) => {
	const [isWorkoutModalOpen, setIsWorkoutModalOpen] = useState(false);
	const [isExerciseModalOpen, setIsExerciseModalOpen] = useState(false);
	const [currentExercise, setCurrentExercise] = useState(null);
	const openExerciseModal = (exercise) => {
		setCurrentExercise(exercise);
		setIsExerciseModalOpen(true);
	};
	const closeExerciseModal = () => {
		setIsExerciseModalOpen(false);
	};
	const openWorkoutModal = () => {
		setIsWorkoutModalOpen(true);
	};
	const closeWorkoutModal = () => {
		setIsWorkoutModalOpen(false);
	};
	const addWorkout = () => {}; // ADD LOGIC, check if logged in first, then add workout to user's workouts
	const deleteExercise = async (exerciseId) => {
		try {
			await axios.delete(`${API_URL}/api/exercises/${exerciseId}`);
			// Refresh the data or remove the exercise from state
		} catch (error) {
			console.error("Failed to delete exercise", error);
		}
	};

	const deleteWorkout = async (workoutId) => {
		try {
			await axios.delete(`/api/workouts/${workoutId}`);
			// Refresh the data or remove the workout from state
		} catch (error) {
			console.error("Failed to delete workout", error);
		}
	};

	return (
		<div className="p-6 border rounded-lg shadow hover:shadow-lg">
			<h2 className="text-2xl font-semibold mb-2">{workout?.name}</h2>
			{inCatalog && (
				<>
					<button
						className="text-blue-600 hover:text-blue-800"
						onClick={addWorkout}
					>
						Add Workout
					</button>
				</>
			)}
			{inTracker && (
				<>
					<button
						className="text-blue-600 hover:text-blue-800"
						onClick={openWorkoutModal}
					>
						Edit Workout
					</button>
				</>
			)}
			<div className="mt-4">
				{workout?.exercises.map((exercise) => (
					<div key={exercise?.id} className="my-2 p-2 border rounded">
						<p>Name: {exercise?.name}</p>
						<p>Sets: {exercise?.sets}</p>
						<p>Reps: {exercise?.reps}</p>
						<p>Weight: {exercise?.weight} kg</p>
						{inTracker && (
							<>
								<button
									className="text-blue-600 hover:text-blue-800"
									onClick={() => openExerciseModal(exercise)}
								>
									Edit Exercise
								</button>
								<button
									className="text-red-600 hover:text-red-800"
									onClick={() => {
										/* delete exercise */
										deleteExercise(exercise.id);
									}}
								>
									Delete Exercise
								</button>
							</>
						)}
					</div>
				))}
			</div>
			{inTracker && (
				<>
					<button
						className="text-blue-600 hover:text-blue-800 mt-4"
						onClick={() => {
							/* add new exercise to workout */
						}}
					>
						Add Exercise
					</button>
					<button
						className="text-red-600 hover:text-red-800 mt-4"
						onClick={() => {
							/* delete workout */
							deleteWorkout(workout.id);
						}}
					>
						Delete Workout
					</button>

					{/* Workout Modal */}
					{isWorkoutModalOpen && (
						<WorkoutModal
							closeModal={closeWorkoutModal}
							currentWorkout={workout}
						/>
					)}

					{/* Exercise Modal */}
					{isExerciseModalOpen && (
						<ExerciseModal
							closeModal={closeExerciseModal}
							workoutId={workout?.id}
							currentExercise={currentExercise}
						/>
					)}
				</>
			)}
		</div>
	);
};

export default WorkoutCard;
