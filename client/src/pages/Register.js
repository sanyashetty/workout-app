import { useContext, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { UserContext } from "../contexts/UserContext";
const API_URL = process.env.REACT_APP_API_URL.replace(/[";]/g, "");

export default function Register() {
	const [username, setUsername] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [redirect, setRedirect] = useState(false);
	const [error, setError] = useState("");
	const { setUserInfo } = useContext(UserContext);

	const navigate = useNavigate();

	async function register(ev) {
		ev.preventDefault();
		try {
			const response = await fetch(`${API_URL}/api/users/signup`, {
				method: "POST",
				body: JSON.stringify({ username, email, password }),
				headers: { "Content-Type": "application/json" },
			});

			if (response.ok) {
				alert("Registration successful!");
				const userInfo = await response.json();
				setUserInfo(userInfo.user);
				setRedirect(true);
			} else {
				response.json().then((errorData) => {
					setError(errorData.originalError || "registration failed");
				});
			}
		} catch (error) {
			console.error("Error during fetch:", error);
			setError("An error occurred while trying to connect to the server.");
		}
	}

	const goToHome = () => {
		navigate("/");
	};

	if (redirect) {
		return <Navigate to={"/"} />;
	}

	return (
		<section
			id="register"
			className="p-8 bg-gray-800 flex items-center justify-center min-h-screen"
		>
			<div className="max-w-3xl mx-auto">
				<h1 className="text-3xl lg:text-4xl font-bold mb-4 text-center text-white">
					Register
				</h1>
				<form className="space-y-4" onSubmit={register}>
					<div className="flex flex-col items-center space-y-4">
						{[
							[username, "Username", setUsername],
							[email, "Email", setEmail],
							[password, "Password", setPassword],
						].map(([value, uppercase, setFunction], index) => {
							return (
								<div className="flex items-center space-x-4" key={index}>
									<label
										htmlFor={value}
										className="text-sm font-medium text-gray-700 w-28"
										style={{ fontSize: "20px" }}
									>
										{uppercase}:
									</label>
									<input
										type={uppercase === "Password" ? "password" : "text"}
										id={index}
										placeholder={"Enter " + uppercase + "..."}
										value={value}
										onChange={(ev) => {
											setFunction(ev.target.value);
										}}
										required
										className="bg-gray-700 text-white border-2 border-gray-500 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 p-2 my-3"
									/>
								</div>
							);
						})}
					</div>
					{error && (
						<div className="error text-center text-red-500 dark:text-red-400 mt-2">
							{error}
						</div>
					)}
					<div className="flex space-x-4 justify-center mt-4">
						<button
							type="submit"
							className="text-white bg-blue-500 rounded-lg px-4 py-2 hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300 mx-1"
						>
							Register
						</button>
						<button
							type="button"
							onClick={goToHome}
							className="text-white bg-blue-500 rounded-lg px-4 py-2 hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300 mx-1"
						>
							Home
						</button>
					</div>
				</form>
			</div>
		</section>
	);
}
