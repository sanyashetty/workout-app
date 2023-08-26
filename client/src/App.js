import React, { useState, useEffect } from "react";
import {
	BrowserRouter as Router,
	Route,
	Routes,
	useLocation,
	useNavigate,
} from "react-router-dom";
import axios from "axios";

import Navbar from "./components/Navbar";
import UserAuth from "./components/UserAuth";
import Dashboard from "./components/Dashboard";
import WorkoutModal from "./components/WorkoutModal";
import ExerciseModal from "./components/ExerciseModal";

const App = () => {
	return (
		<Router>
			<AppContent />
		</Router>
	);
};

const AppContent = () => {
	const [isAuthenticated, setIsAuthenticated] = useState(false);
	const navigate = useNavigate();
	const location = useLocation();

	useEffect(() => {
		// Check if the user is authenticated when the app loads
		const checkAuthentication = async () => {
			try {
				const response = await axios.get(
					"http://localhost:5050/api/users/verify-user"
				); // Adjust this endpoint according to your backend
				console.log(response);
				if (response.status === 200) {
					setIsAuthenticated(true);
				}
			} catch (error) {
				console.error("Error checking authentication:", error);
			}
		};

		checkAuthentication();
	}, []);

	// useEffect(() => {
	// 	if (!isAuthenticated && location.pathname !== "/user-auth") {
	// 		navigate("/user-auth");
	// 	}
	// }, [isAuthenticated, location, navigate]);

	return (
		<div className="App">
			{location.pathname !== "/user-auth" && (
				<Navbar isAuthenticated={isAuthenticated} />
			)}
			<Routes>
				<Route path="/" element={<Dashboard />} />
				<Route path="/user-auth" element={<UserAuth />} />
			</Routes>
		</div>
	);
};

export default App;
