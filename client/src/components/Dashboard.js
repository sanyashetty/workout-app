import React, { useState, useEffect } from "react";
import axios from "axios";
import SearchBar from "./SearchBar";
import WorkoutCard from "./WorkoutCard";

const Dashboard = () => {
	const [workouts, setWorkouts] = useState([]);
	const [query, setQuery] = useState("");
	const [filteredWorkouts, setFilteredWorkouts] = useState([]);

	useEffect(() => {
		// Fetch the user's workouts when the component mounts
		const fetchWorkouts = async () => {
			try {
				const response = await axios.get("/api/workouts");
				setWorkouts(response.data);
			} catch (error) {
				console.error("Error fetching workouts:", error);
			}
		};

		fetchWorkouts();
	}, []);

	useEffect(() => {
		const lowercasedQuery = query.toLowerCase();

		const newFilteredWorkouts = workouts.filter((workout) => {
			// Search in workout names
			if (workout.name.toLowerCase().includes(lowercasedQuery)) return true;

			// Search in exercise names
			const foundExercise = workout.exercises.find((exercise) =>
				exercise.name.toLowerCase().includes(lowercasedQuery)
			);
			return Boolean(foundExercise);
		});

		setFilteredWorkouts(newFilteredWorkouts);
	}, [query, workouts]);

	return (
		<div className="dashboard">
			<SearchBar query={query} setQuery={setQuery} />
			<h1>Your Workouts</h1>
			<div className="workout-list">
				{filteredWorkouts.map((workout) => (
					<WorkoutCard key={workout.id} workout={workout} />
				))}
			</div>
		</div>
	);
};

export default Dashboard;
