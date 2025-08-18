import { useEffect, useState } from "react";

import styles from "./Form.module.css";

import BackBotton from "./BackBotton";
import Button from "./Button";
import Message from "./Message";
import Spinner from "./Spinner";
import { useUrlPostion } from "../hooks/useUrlPosition";

const BASE_URL = "https://api.bigdatacloud.net/data/reverse-geocode-client";

export function convertToEmoji(countryCode) {
	const codePoints = countryCode
		.toUpperCase()
		.split("")
		.map(char => 127397 + char.charCodeAt());
	return String.fromCodePoint(...codePoints);
}

function Form() {
	const [lat, lng] = useUrlPostion();

	const [isLoadingGeolocation, setIsLoadingGeolocation] = useState(false);
	const [cityName, setCityName] = useState("");
	const [country, setCountry] = useState("");
	const [date, setDate] = useState(new Date());
	const [notes, setNotes] = useState("");
	const [emoji, setEmoji] = useState("");
	const [geocodingError, setGeocodingError] = useState("");

	useEffect(
		function () {
			async function fetchCityData() {
				try {
					setIsLoadingGeolocation(true);
					setGeocodingError("");
					const resp = await fetch(
						`${BASE_URL}?latitude=${lat}&longitude=${lng}`
					);
					const data = await resp.json();
					if (!data.countryCode)
						throw new Error(
							"That doesn't seem to be a city. Click somewhere else 🙃"
						);

					setCityName(data.city || data.locality || "");
					setCountry(data.countryName);
					setEmoji(convertToEmoji(data.countryCode));
				} catch (err) {
					setGeocodingError(err.message);
				} finally {
					setIsLoadingGeolocation(false);
				}
			}
			fetchCityData();
		},
		[lat, lng]
	);

	if (isLoadingGeolocation) return <Spinner />;

	if (geocodingError) return <Message message={geocodingError} />;

	return (
		<form className={styles.form}>
			<div className={styles.row}>
				<label htmlFor="cityName">City name</label>
				<input
					id="cityName"
					onChange={e => setCityName(e.target.value)}
					value={cityName}
				/>
				<span className={styles.flag}>{emoji}</span>
			</div>

			<div className={styles.row}>
				<label htmlFor="date">When did you go to {cityName}?</label>
				<input id="date" onChange={e => setDate(e.target.value)} value={date} />
			</div>

			<div className={styles.row}>
				<label htmlFor="notes">Notes about your trip to {cityName}</label>
				<textarea
					id="notes"
					onChange={e => setNotes(e.target.value)}
					value={notes}
				/>
			</div>

			<div className={styles.buttons}>
				<Button type="primary">Add</Button>
				<BackBotton />
			</div>
		</form>
	);
}

export default Form;
