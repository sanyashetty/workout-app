import React from "react";

const SearchBar = ({ query, setQuery }) => {
	return (
		<div className="search-bar">
			<input
				type="text"
				value={query}
				onChange={(e) => setQuery(e.target.value)}
				placeholder="Search for workouts or exercises..."
			/>
		</div>
	);
};

export default SearchBar;
