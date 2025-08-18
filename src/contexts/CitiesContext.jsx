import { useContext } from "react";
import { createContext, useEffect, useState } from "react";

const BASE_URL = "http://localhost:8000";

const CitiesContext = createContext();

function CitiesProvider({ children }) {
	const [cities, setCities] = useState([]);
	const [isLoading, setIsLoading] = useState(false);

	useEffect(function () {
		async function fetchCities() {
			try {
				setIsLoading(true);
				const resp = await fetch(`${BASE_URL}/cities`);
				const data = await resp.json();
				console.log(data);
				setCities(data);
			} catch (err) {
				console.error(err);
			} finally {
				setIsLoading(false);
			}
		}
		fetchCities();
	}, []);

	return (
		<CitiesContext.Provider value={{ cities, isLoading }}>
			{children}
		</CitiesContext.Provider>
	);
}

function useCities() {
	const context = useContext(CitiesContext);
	if (context === undefined)
		throw new Error("CitiesContext was used outside the CitiesProvider");
	return context;
}

export { CitiesProvider, useCities };
