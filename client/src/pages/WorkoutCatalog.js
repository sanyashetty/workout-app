import React, { useState, useEffect } from "react";
import axios from "axios";
import SearchBar from "../components/SearchBar";
import WorkoutCard from "../components/WorkoutCard";
const API_URL = process.env.REACT_APP_API_URL.replace(/[";]/g, "");

const WorkoutCatalog = () => {
	const [workouts, setWorkouts] = useState([
		{
			id: 1,
			name: "test",
			exercises: [{ id: 1, name: "test", sets: 1, reps: 1, weight: 1 }],
		},
		{
			id: 1,
			name: "test",
			exercises: [
				{ id: 1, name: "test", sets: 1, reps: 1, weight: 1 },
				{ id: 1, name: "test", sets: 1, reps: 1, weight: 1 },
			],
		},
	]);
	const [query, setQuery] = useState("");
	const [filteredWorkouts, setFilteredWorkouts] = useState(workouts);

	useEffect(() => {
		// Fetch the user's workouts when the component mounts
		const fetchWorkouts = async () => {
			try {
				const response = await axios.get(`${API_URL}/api/workouts/`);
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
		<div className="p-8">
			<SearchBar query={query} setQuery={setQuery} />
			<h1 className="text-4xl font-bold my-4 flex items-center justify-center">
				Browse Workouts
			</h1>
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
				{filteredWorkouts.map((workout) => (
					<WorkoutCard key={workout.id} workout={workout} inCatalog={true} />
				))}
			</div>
		</div>
	);
};

export default WorkoutCatalog;
