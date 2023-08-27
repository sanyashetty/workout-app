import React from "react";
import {
	BrowserRouter as Router,
	Route,
	Routes,
	useLocation,
} from "react-router-dom";

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
}

const AppContent = () => {
	const location = useLocation();

	return (
		<div className="App">
			{location.pathname !== "/login" && location.pathname !== "/register" && (
				<Navbar />
			)}
			<div
				className={
					location.pathname === "/login" || location.pathname === "/register"
						? ""
						: "pt-20"
				}
			>
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
