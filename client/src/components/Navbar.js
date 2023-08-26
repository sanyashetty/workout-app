import React, { Button } from "react";
import { Link, useLocation } from "react-router-dom";

const Navbar = ({ isAuthenticated }) => {
	const location = useLocation();

	return (
		<nav className="navbar">
			<div className="container">
				<Link to="/" className="navbar-brand">
					Workout Tracker
				</Link>

				<ul className="navbar-nav">
					{!isAuthenticated && (
						<>
							{location.pathname !== "/login" && (
								<li className="nav-item">
									<Link to="/login" className="nav-link">
										Login
									</Link>
								</li>
							)}
							{location.pathname !== "/signup" && (
								<li className="nav-item">
									<Link to="/signup" className="nav-link">
										Sign Up
									</Link>
								</li>
							)}
						</>
					)}

					{isAuthenticated && (
						<>
							<li className="nav-item">
								<Link to="/dashboard" className="nav-link">
									Dashboard
								</Link>
							</li>
							<li className="nav-item">
								<Button
									className="nav-link"
									onClick={() => {
										// LOGIC TBD
										console.log("hello world");
									}}
								>
									Logout
								</Button>
							</li>
						</>
					)}
				</ul>
			</div>
		</nav>
	);
};

export default Navbar;
