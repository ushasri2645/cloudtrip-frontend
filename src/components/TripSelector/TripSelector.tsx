import { useState } from "react";
import styles from "./TripSelector.module.css";

const TripSelector = () => {
    const [tripType, setTripType] = useState("one_way");

    return (
        <div className={styles.tripOptionsInline}>
            <label className={styles.radioOption}>
                <input
                    type="radio"
                    name="trip_type"
                    value="one_way"
                    checked={tripType === "one_way"}
                    onChange={() => setTripType("one_way")}
                />
                One Way
            </label>

            <label className={styles.radioOption}>
                <input
                    type="radio"
                    name="trip_type"
                    value="round_trip"
                    checked={tripType === "round_trip"}
                    onChange={() => setTripType("round_trip")}
                />
                Round Trip
            </label>
        </div>
    );
};

export default TripSelector;
