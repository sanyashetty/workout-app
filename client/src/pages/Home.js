import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
const API_URL = process.env.REACT_APP_API_URL.replace(/[";]/g, "");

const Home = () => {
	const [quote, setQuote] = React.useState("Conquer yourself.");
	useEffect(() => {
		const getQuote = async () => {
			const quoteFromServer = await axios.get(`${API_URL}/api/quotes`);
			setQuote(quoteFromServer.data);
		};
		//getQuote();
	}, []);
	return (
		<div className="p-8 text-center">
			<h1 className="text-4xl font-bold mb-4">FitLog📈</h1>
			<p className="text-xl mb-8">
				Your one-stop shop for tracking workouts and discovering new workout
				routines.
			</p>

			<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
				<Link
					to="/workout-catalog"
					className="text-lg font-semibold text-blue-600 hover:text-blue-800"
				>
					<div className="card p-6 rounded-lg shadow-lg hover:shadow-xl transition duration-300 ease-in-out">
						<h2 className="mb-4">Workout Catalog</h2>
						<p>Browse and discover new workouts.</p>
					</div>
				</Link>
				<Link
					to="/workout-tracker"
					className="text-lg font-semibold text-blue-600 hover:text-blue-800"
				>
					<div className="card p-6 rounded-lg shadow-lg hover:shadow-xl transition duration-300 ease-in-out">
						<h2 className="mb-4">Workout Tracker</h2>
						<p>Keep track of your workout routine.</p>
					</div>
				</Link>
			</div>
			<blockquote className="text-lg italic mt-8">
				<p>{quote}</p>
			</blockquote>
		</div>
	);
};

export default Home;
