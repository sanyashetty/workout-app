import React from "react";

const SearchBar = ({ query, setQuery }) => {
	return (
		<div className="search-bar flex items-center justify-center">
			<input
				type="text"
				value={query}
				onChange={(e) => setQuery(e.target.value)}
				placeholder="Search for workouts or exercises..."
				className="w-full p-2 text-gray-900 bg-white border rounded-md focus:outline-none focus:border-blue-500"
			/>
			<button className="bg-blue-500 text-white p-2 rounded-md ml-2">
				Search
			</button>
		</div>
	);
};

export default SearchBar;
