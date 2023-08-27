import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="p-8 text-center">
      <h1 className="text-4xl font-bold underline mb-4">Welcome to My Workout App!</h1>
      <p className="text-xl mb-8">
        Your one-stop solution for tracking workouts and discovering new workout
        routines.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="card p-6 rounded-lg shadow-lg hover:shadow-xl transition duration-300 ease-in-out">
          <Link to="/workout-catalog" className="text-lg font-semibold text-blue-600 hover:text-blue-800">
            <h2 className="mb-4">Workout Catalog</h2>
            <p>Browse and discover new workouts.</p>
          </Link>
        </div>
        <div className="card p-6 rounded-lg shadow-lg hover:shadow-xl transition duration-300 ease-in-out">
          <Link to="/workout-tracker" className="text-lg font-semibold text-blue-600 hover:text-blue-800">
            <h2 className="mb-4">Workout Tracker</h2>
            <p>Keep track of your workout routine.</p>
          </Link>
        </div>
      </div>

      {/* Optionally, a list of recently added or completed workouts */}
      <h2 className="text-2xl font-bold underline mt-8 mb-4">Recently Added Workouts:</h2>
      {/* ... */}

      {/* Optional motivational quote */}
      <blockquote className="text-lg italic mt-8">
        <p>"Your only limit is you."</p>
      </blockquote>
    </div>
  );
};

export default Home;
