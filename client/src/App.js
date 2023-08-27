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
import Home from "./pages/Home";
import WorkoutCatalog from "./pages/WorkoutCatalog";
import WorkoutTracker from "./pages/WorkoutTracker";
import Login from "./pages/Login";
import Register from "./pages/Register";

export default function App() {
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
			{(location.pathname !== "/login" && location.pathname !== "/register") && (
				<Navbar isAuthenticated={isAuthenticated} />
			)}
			<div className={location.pathname === "/login" || location.pathname === "/register" ? "" : "pt-20"}>

			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/workout-catalog" element={<WorkoutCatalog />} />
				<Route path="/workout-tracker" element={<WorkoutTracker />} />
				<Route path="/login" element={<Login />} />
				<Route path="/register" element={<Register />} />
			</Routes>
		</div>
		</div>
	);
};
