import React, { useContext } from "react";
import { UserContext } from "../contexts/UserContext";
import WorkoutCard from "../components/WorkoutCard";
import { Navigate } from "react-router-dom";

const WorkoutTracker = () => {
	const { userInfo } = useContext(UserContext);

	return (
		<div>
			{userInfo ? (
				<div className="p-8">
					<h1 className="text-4xl font-bold mb-4">Workout Tracker</h1>
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
						{userInfo?.workouts.map((workout) => (
							<WorkoutCard
								key={workout.id}
								workout={workout}
								inTracker={true}
							/>
						))}
					</div>
				</div>
			) : (
				<Navigate to={"/login"} />
			)}
		</div>
	);
};

export default WorkoutTracker;