import { useState } from "react";
import { useCities } from "../../hooks/useCities";
import { fetchFlights } from "../../services/FetchFlights";
import type { FlightSearchFormData } from "../../types/FlightSearchForm";
import type { FlightSearchResult } from "../../types/FlightSearchResult";
import { Button } from "../Button/Button";
import { FlightsDisplay } from "../FlightsDisplay/FlightsDisplay";
import styles from "./SearchForm.module.css";
import { CustomAlert } from "../CustomAlert/CustomAlert";

export function FlightSearchForm() {
  const [formData, setFormData] = useState<FlightSearchFormData>({
    source: "",
    destination: "",
    date: "",
    passengers: 1,
    class_type: "economy",
  });

  const [loading, setLoading] = useState(false);
  const [flightsLoading, setFlightsLoading] = useState(false);
  const [flights, setFlights] = useState<FlightSearchResult[]>([]);
  const [searched, setSearched] = useState(false);
  const { cities, refetch } = useCities();
  const [alertMessage, setAlertMessage] = useState<string | null>(null);
  const [failure, setFailure] = useState(false);

  const formatDate = (date: Date) => date.toISOString().split("T")[0];

  const today = new Date();
  const maxDate = new Date(new Date().setMonth(today.getMonth() + 3));

  const todayString = formatDate(today);
  const maxDateString = formatDate(maxDate);

  const isPrevDisabled = formData.date === todayString;
  const isNextDisabled = formData.date === maxDateString;

  const refresh = async () => {
    setLoading(true);
    await refetch();
    setLoading(false);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSwap = () => {
    setFormData((prevData) => ({
      ...prevData,
      source: prevData.destination,
      destination: prevData.source,
    }));
  };

  const fetchAndSetFlights = async (data: FlightSearchFormData) => {
    setFlightsLoading(true);
    try {
      const results = await fetchFlights(data);
      setFlights(results);
      setSearched(true);
      setFailure(false);
    } catch (error) {
      setSearched(false);
      setAlertMessage((error as Error).message);
      setFailure(true);
    }
    finally{
      setFlightsLoading(false);
    }
  };

  const getFlights = (e: React.FormEvent) => {
    e.preventDefault();
    fetchAndSetFlights(formData);
  };

  const updateDateAndFetchFlights = (days: number) => {
    const currentDate = new Date(formData.date);
    currentDate.setDate(currentDate.getDate() + days);
    const newDateStr = currentDate.toISOString().split("T")[0];

    const updatedFormData = { ...formData, date: newDateStr };
    setFormData(updatedFormData);
    fetchAndSetFlights(updatedFormData);
  };

  return (
    <div>
      <div className={styles.hero}>
        <h1>Travel Beyond Boundaries</h1>
      </div>
      <div className={styles.container}>
        <p className={styles.subHeader}>
          Search for flights to your dream destinations and book with ease.
        </p>
        {alertMessage && (
          <CustomAlert
            message={alertMessage}
            failure={failure}
            onClose={() => setAlertMessage(null)}
          />
        )}
        <form onSubmit={getFlights}>
          <div className={styles.formGroup}>
            <div className={styles.labelInput}>
              <label htmlFor="source">Source:</label>
              <input
                type="text"
                id="source"
                name="source"
                list="source-list"
                value={formData.source}
                onChange={handleChange}
                required
              />
            </div>
            <button
              type="button"
              className={styles.swapButton}
              onClick={handleSwap}
              aria-label="Swap"
            ></button>
            <div className={styles.labelInput}>
              <label htmlFor="destination">Destination:</label>
              <input
                type="text"
                id="destination"
                name="destination"
                list="destination-list"
                value={formData.destination}
                onChange={handleChange}
                required
              />
            </div>

            <div className={styles.labelInput}>
              <label htmlFor="date">Departure Date:</label>
              <input
                type="date"
                id="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                required
                min={todayString}
                max={maxDateString}
              />
            </div>

            <div className={styles.labelInput}>
              <label htmlFor="passengers">Number of Passengers:</label>
              <input
                type="number"
                id="passengers"
                name="passengers"
                min={1}
                max={4}
                value={formData.passengers}
                onChange={handleChange}
              />
            </div>

            <div className={styles.labelInput}>
              <label htmlFor="class_type">Class Type:</label>
              <select
                id="class_type"
                name="class_type"
                value={formData.class_type}
                onChange={handleChange}
              >
                <option value="economy">Economy</option>
                <option value="business">Business</option>
                <option value="first_class">First Class</option>
              </select>
            </div>
            <Button type="submit" disabled={flightsLoading}>{flightsLoading ? (
    <div className={styles.buttonSpinner}></div>
  ) : (
    "Search Flights"
  )}</Button>
  
          </div>
        </form>

        <button
          type="button"
          onClick={refresh}
          disabled={loading}
          className={styles.refreshBtn}
        >
          {loading ? "..." : "Refresh Cities"}
        </button>

        <datalist id="source-list">
          {cities.map((city) => (
            <option key={city} value={city} />
          ))}
        </datalist>

        <datalist id="destination-list">
          {cities.map((city) => (
            <option key={city} value={city} />
          ))}
        </datalist>
      </div>
      {searched && (
        <>
          <div className={styles.buttons_container}>
            <button
              className={styles.button}
              disabled={isPrevDisabled}
              onClick={() => updateDateAndFetchFlights(-1)}
            >
              Previous
            </button>
            <button
              className={styles.button}
              disabled={isNextDisabled}
              onClick={() => updateDateAndFetchFlights(1)}
            >
              Next
            </button>
          </div>
          <FlightsDisplay flights={flights} passengers={formData.passengers} />
        </>
      )}
    </div>
  );
}