import React, { useState, useEffect, useContext } from "react";
import WorkoutModal from "./WorkoutModal";
import ExerciseModal from "./ExerciseModal";
import axios from "axios";
import { UserContext } from "../contexts/UserContext";

const API_URL = process.env.REACT_APP_API_URL.replace(/[";]/g, "");

const WorkoutCard = ({ workout, inTracker, inCatalog }) => {
	const [isWorkoutModalOpen, setIsWorkoutModalOpen] = useState(false);
	const [isExerciseModalOpen, setIsExerciseModalOpen] = useState(false);
	const [currentExercise, setCurrentExercise] = useState(null);
	const [fetchedExercises, setFetchedExercises] = useState([]);
	const { userInfo, setUserInfo } = useContext(UserContext);

	const openExerciseModal = (exercise) => {
		setCurrentExercise(exercise);
		setIsExerciseModalOpen(true);
	};
	const closeExerciseModal = () => {
		setIsExerciseModalOpen(false);
		fetchExercises();
	};
	const openWorkoutModal = () => {
		setIsWorkoutModalOpen(true);
	};
	const closeWorkoutModal = () => {
		setIsWorkoutModalOpen(false);
	};
	const addWorkout = () => {}; // ADD LOGIC, check if logged in first, then add workout to user's workouts

	const fetchExercises = async () => {
		try {
			let detailedExercises = [];

			for (let exercise of workout?.exercises) {
				let response = await axios.get(
					`${API_URL}/api/exercises/by-id/${exercise}`
				);
				detailedExercises.push(response.data);
			}

			setFetchedExercises(detailedExercises);
		} catch (error) {
			console.error("Failed to fetch exercise details", error);
		}
	};

	useEffect(() => {
		// Fetch each exercise's detailed data
		const fetchExercises = async () => {
			try {
				let detailedExercises = [];

				for (let exercise of workout?.exercises) {
					let response = await axios.get(
						`${API_URL}/api/exercises/by-id/${exercise}`
					);
					detailedExercises.push(response.data);
				}

				setFetchedExercises(detailedExercises);
			} catch (error) {
				console.error("Failed to fetch exercise details", error);
			}
		};

		fetchExercises();
	}, [workout]);

	const deleteExercise = async (exerciseId) => {
		try {
			const updatedExercises = fetchedExercises.filter(
				(exercise) => exercise._id !== exerciseId
			);

			await axios.put(`${API_URL}/api/workouts/by-id/${workout?._id}`, {
				exercises: updatedExercises,
			});

			await axios.delete(`${API_URL}/api/exercises/by-id/${exerciseId}`);
			fetchExercises();

			// Refresh the data or remove the exercise from state
		} catch (error) {
			console.error("Failed to delete exercise", error);
		}
	};

	const deleteWorkout = async (workoutId) => {
		try {
			const currentWorkouts = userInfo.workouts || [];
			const updatedWorkouts = currentWorkouts.filter(
				(workout) => workout !== workoutId
			);

			setUserInfo({ ...userInfo, workouts: updatedWorkouts });

			await axios.put(`${API_URL}/api/users/by-id/${userInfo?._id}`, {
				workouts: updatedWorkouts,
			});

			await axios.delete(`${API_URL}/api/workouts/by-id/${workoutId}`);
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
				{fetchedExercises.map((exercise) => (
					<div key={exercise?.id} className="my-2 p-2 border rounded">
						<p>Name: {exercise?.name}</p>
						<p>Sets: {exercise?.sets}</p>
						<p>Reps: {exercise?.reps}</p>
						<p>Weight: {exercise?.weights} lbs</p>
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
										deleteExercise(exercise._id);
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
							openExerciseModal();
						}}
					>
						Add Exercise
					</button>
					<button
						className="text-red-600 hover:text-red-800 mt-4"
						onClick={() => {
							/* delete workout */
							deleteWorkout(workout._id);
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
							workoutId={workout?._id}
							currentExercise={currentExercise}
						/>
					)}
				</>
			)}
		</div>
	);
};

export default WorkoutCard;
