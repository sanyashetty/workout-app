import { useState } from "react";

export const useForceRefresh = () => {
	const [refreshKey, setRefreshKey] = useState(0);

	const forceRefresh = () => {
		setRefreshKey((prevKey) => prevKey + 1);
	};

	return [refreshKey, forceRefresh];
};
