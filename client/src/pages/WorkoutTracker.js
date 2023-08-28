import React, { useState, useContext, useEffect } from "react";
import { UserContext } from "../contexts/UserContext";
import WorkoutCard from "../components/WorkoutCard";
import { Navigate } from "react-router-dom";
import WorkoutModal from "../components/WorkoutModal";
import axios from "axios";
import { useForceRefresh } from "../utils/ForceRefresh";

const API_URL = process.env.REACT_APP_API_URL.replace(/[";]/g, "");

const WorkoutTracker = () => {
	const { userInfo } = useContext(UserContext);
	const [isWorkoutModalOpen, setIsWorkoutModalOpen] = useState(false);
	const [fetchedWorkouts, setFetchedWorkouts] = useState([]);
	const [refreshKey, forceRefresh] = useForceRefresh();

	const fetchWorkouts = async () => {
		try {
			let detailedWorkouts = [];

			for (let workout of userInfo?.workouts) {
				let response = await axios.get(
					`${API_URL}/api/workouts/by-id/${workout}`
				);
				detailedWorkouts.push(response.data);
			}

			setFetchedWorkouts(detailedWorkouts);
		} catch (error) {
			console.error("Failed to fetch exercise details", error);
		}
	};

	const closeWorkoutModal = () => {
		setIsWorkoutModalOpen(false);
		fetchWorkouts();
		// Refresh the workouts list here if needed
		forceRefresh();
	};

	useEffect(() => {
		const fetchWorkouts = async () => {
			try {
				let detailedWorkouts = [];

				for (let workout of userInfo?.workouts) {
					let response = await axios.get(
						`${API_URL}/api/workouts/by-id/${workout}`
					);
					detailedWorkouts.push(response.data);
				}

				setFetchedWorkouts(detailedWorkouts);
			} catch (error) {
				console.error("Failed to fetch exercise details", error);
			}
		};

		fetchWorkouts();
	}, [userInfo?.workouts, refreshKey]);

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
						{fetchedWorkouts.map((workout) => (
							<WorkoutCard
								key={workout._id}
								workout={workout}
								inTracker={true}
								forceRefresh={forceRefresh}
								refreshKey={refreshKey}
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
