import React, { useState, useContext } from "react";
import { UserContext } from "../contexts/UserContext";
import WorkoutCard from "../components/WorkoutCard";
import { Navigate } from "react-router-dom";
import WorkoutModal from "../components/WorkoutModal";
import ExerciseModal from "../components/ExerciseModal";

const WorkoutTracker = () => {
	const { userInfo } = useContext(UserContext);
	const [isWorkoutModalOpen, setIsWorkoutModalOpen] = useState(false);
	const [isExerciseModalOpen, setIsExerciseModalOpen] = useState(false);
	const [currentExercise, setCurrentExercise] = useState(null);
	const closeExerciseModal = () => {
		setIsExerciseModalOpen(false);
	};

	const closeWorkoutModal = () => {
		setIsWorkoutModalOpen(false);
		// Refresh the workouts list here if needed
	};

	return (
		<div>
			{userInfo ? (
				<div className="p-8">
					<h1 className="text-4xl font-bold mb-4">My Workouts</h1>
					<button
						className="text-blue-600 hover:text-blue-800"
						onClick={() => {
							setIsWorkoutModalOpen(true);
							console.log(isWorkoutModalOpen);
						}}
					>
						Create New Workout
					</button>
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
						{userInfo?.workouts.map((workout) => (
							<WorkoutCard
								key={workout.id}
								workout={workout}
								inTracker={true}
							/>
						))}
					</div>
					{/* Workout Modal */}
					{isWorkoutModalOpen && (
						<WorkoutModal closeModal={closeWorkoutModal} />
					)}
				</div>
			) : (
				<Navigate to={"/login"} />
			)}
		</div>
	);
};

export default WorkoutTracker;
