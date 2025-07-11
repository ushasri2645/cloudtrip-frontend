import { useState } from "react";
import { useCities } from "../../hooks/useCities";
import type { FlightSearchFormData } from "../../types/FlightSearchForm";
import { Button } from "../Button/Button";
import styles from "./SearchForm.module.css";

export function FlightSearchForm() {
  const [formData, setFormData] = useState<FlightSearchFormData>({
    source: "",
    destination: "",
    date: "",
    passengers: 1,
    class_type: "economy",
  });

  const [loading, setLoading] = useState(false);
  const { cities, refetch } = useCities();

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

  return (
    <div>
      <div className={styles.hero}>
        <h1>Travel Beyond Boundaries</h1>
      </div>
      <div className={styles.container}>
        <p className={styles.subHeader}>
          Search for flights to your dream destinations and book with ease.
        </p>
        
        <form>
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
                min={new Date().toISOString().split("T")[0]}
                max={
                  new Date(new Date().setMonth(new Date().getMonth() + 3))
                    .toISOString()
                    .split("T")[0]
                }
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
            <Button type="submit">Search Flights</Button>
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
    </div>
  );
}
