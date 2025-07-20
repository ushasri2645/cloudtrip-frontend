import React from "react";
import styles from "./FlightSearchFields.module.css";
import type { FlightSearchFormData } from "../../types/FlightSearchForm";

type Props = {
  formData: FlightSearchFormData;
  handleChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
  handleSwap: () => void;
  cities: string[];
  todayString: string;
  maxDateString: string;
};

export function FlightSearchFields({
  formData,
  handleChange,
  handleSwap,
  cities,
  todayString,
  maxDateString,
}: Props) {
  return (
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
  );
}
