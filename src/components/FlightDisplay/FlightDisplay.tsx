import type { FlightSearchResult } from "../../types/FlightSearchResult";
import styles from './FlightDisplay.module.css';

function FlightDisplay({ flight, passengers }: { flight: FlightSearchResult, passengers: number }) {
    const classTypeFormatted = flight.class_type.toUpperCase();
    const availableSeats =
        flight[`${flight.class_type}_seats` as keyof FlightSearchResult];

    return (
        <div
            key={flight.flight_number}
            className={styles.flightCard}
        >
            <div className={styles.flightCardContent}>
                <div className={styles.flightCardHeader}>
                    <span className={styles.route}>
                        {flight.source} → {flight.destination}
                    </span>
                    <span className={styles.flightNumber}>
                        Flight {flight.flight_number}
                    </span>
                </div>
                <div className={styles.flightCardDetails}>
                    <div className={styles.detailBlock}>
                        <strong>Departure:</strong>
                        <div>
                            {flight.departure_date} at {flight.departure_time}
                        </div>
                    </div>
                    <div className={styles.detailBlock}>
                        <strong>Arrival:</strong>
                        <div>
                            {flight.arrival_date} at {flight.arrival_time}
                        </div>
                    </div>
                    <div className={styles.detailBlock}>
                        <strong>Class:</strong>
                        <div>{classTypeFormatted}</div>
                    </div>
                    <div className={styles.detailBlock}>
                        <strong>Available Seats:</strong>
                        <div>{availableSeats}</div>
                    </div>
                </div>

                <div className={styles.flightCardFooter}>
                    <div>
                        <div>
                            <strong>
                                Total Fare for {passengers} passenger
                                {passengers > 1 ? "s" : ""}:
                            </strong>
                        </div>
                        <div className={styles.totalFare}>
                            ${flight.total_fare.toFixed(2)}
                        </div>
                        <div className={styles.fareBreakdown}>
                            <div>
                                Price per person:{" "}
                                <span>${flight.price_per_person.toFixed(2)}</span>
                            </div>
                            <div>
                                Base price: <span>${flight.base_price.toFixed(2)}</span>
                            </div>
                            <div>
                                Dynamic Price:{" "}
                                <span>${flight.extra_price.toFixed(2)}</span>
                            </div>
                        </div>
                    </div>

                    <div className={styles.book}>
                        <button className={styles.bookButton}>Book Now</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default FlightDisplay