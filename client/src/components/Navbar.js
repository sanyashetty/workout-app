import React, { useState, useContext } from "react";
import { UserContext } from "../contexts/UserContext";
import { Link } from "react-router-dom";
const API_URL = process.env.REACT_APP_API_URL.replace(/[";]/g, "");

function NavBar() {
	const { userInfo, setUserInfo } = useContext(UserContext);

	const [menuOpen, setMenuOpen] = useState(false);

	const toggleMenu = () => {
		setMenuOpen(!menuOpen);
	};

	return (
		<div>
			<nav className="bg-gray-100 dark:bg-gray-800 fixed w-full z-20 top-0 left-0 border-b border-gray-200 dark:border-gray-600">
				<div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
					<button>
						<Link
							to="/"
							className="flex items-center text-2xl font-semibold whitespace-nowrap dark:text-white"
						>
							FitLog📈
						</Link>
					</button>
					<div className="flex md:order-2">
						{!userInfo ? (
							<>
								<Link
									to="/login"
									className="text-white bg-blue-500 rounded-lg px-4 py-2 hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300 mx-1"
								>
									Login
								</Link>

								<Link
									to="/register"
									className="text-white bg-blue-500 rounded-lg px-4 py-2 hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300 mx-1"
								>
									Register
								</Link>
							</>
						) : (
							<>
								<button className="hidden md:block text-white bg-blue-500 rounded-lg px-4 py-2 hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300 mx-1">
									{"Hello, " + userInfo?.username + "!"}
								</button>
								<button
									onClick={() => {
										setUserInfo(null);
										try {
											const response = fetch(`${API_URL}/api/users/logout`, {
												method: "POST",
											});
										} catch (err) {
											console.log(err);
										}
									}}
									className="text-white bg-blue-500 rounded-lg px-4 py-2 ml-2 hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300 mx-1"
								>
									Logout
								</button>
							</>
						)}
						<button
							onClick={toggleMenu}
							data-collapse-toggle="navbar-sticky"
							type="button"
							className="md:hidden px-2 py-1 rounded-lg border-2 border-gray-600 bg-blue-500 hover:text-white focus:outline-none focus:ring focus:ring-blue-300 mx-1"
							aria-controls="navbar-sticky"
							aria-expanded="false"
						>
							<svg
								className="w-5 h-5"
								aria-hidden="true"
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 17 14"
							>
								<path
									stroke="currentColor"
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth="2"
									d="M1 1h15M1 7h15M1 13h15"
								/>
							</svg>
						</button>
					</div>
					<div
						className={`${
							menuOpen ? "block" : "hidden"
						} items-center justify-between w-full md:flex md:w-auto md:order-1 bg-gray-100 dark:bg-gray-800 mt-1 md:mt-0`}
						id="navbar-sticky"
					>
						<ul className="flex justify-center items-center flex-col rounded-lg md:flex-row md:space-x-8 md:bg-transparent bg-gray-100 dark:bg-gray-800 dark:border-gray-700">
							{[
								["/workout-catalog", "Workout Catalog"],
								["/workout-tracker", "Workout Tracker"],
							].map(([path, name]) => (
								<li key={path}>
									<Link
										to={path}
										className="block py-2 bg-gray-100 dark:bg-gray-800 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-another_sunset md:p-0 md:dark:hover:text-light_orange dark:text-white dark:hover:bg-gray-600 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
									>
										{name}
									</Link>
								</li>
							))}
						</ul>
					</div>
				</div>
			</nav>
		</div>
	);
}

export default NavBar;
