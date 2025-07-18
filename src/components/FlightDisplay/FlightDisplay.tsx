import { useState } from "react";
import { bookFlight } from "../../services/BookFlight";
import type { FlightSearchResult } from "../../types/FlightSearchResult";
import styles from "./FlightDisplay.module.css";
import { CustomAlert } from "../CustomAlert/CustomAlert";
import { formatDateTime } from "../../helpers/formatData";

function FlightDisplay({
  flight,
  passengers,
}: {
  flight: FlightSearchResult;
  passengers: number;
}) {
  const classTypeFormatted = flight.class_type.toUpperCase();
  const [alertMessage, setAlertMessage] = useState<string | null>(null);
  const [failure, setFailure] = useState(false);
  const [loading, setLoading] = useState(false);
  const book = async () => {
    try {
      setLoading(true);
      const isBooked = await bookFlight(flight, passengers);
      if (isBooked) {
        setAlertMessage("Booking Successful!");
        setFailure(false);
      }
    } catch (e) {
      setAlertMessage(`${(e as Error).message}`);
      setFailure(true);
    } finally {
      setLoading(false);
    }
  };
 
  return (
    <div key={flight.flight_number} className={styles.flightCard}>
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
              {formatDateTime(flight.departure_date)}
            </div>
          </div>
          <div className={styles.detailBlock}>
            <strong>Arrival:</strong>
            <div>{formatDateTime(flight.arrival_date)}</div>
          </div>
          <div className={styles.detailBlock}>
            <strong>Class:</strong>
            <div>{classTypeFormatted}</div>
          </div>
          <div className={styles.detailBlock}>
            <strong>Available Seats:</strong>
            <div>{flight.available_seats}</div>
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
            <div className={styles.totalFare}>${flight.total_fare}</div>
            <div className={styles.fareBreakdown}>
              <div>
                Price per person: <span>${flight.price_per_person}</span>
              </div>
              <div>
                Base price: <span>${flight.base_price}</span>
              </div>
              <div>
                Dynamic Price: <span>${flight.extra_price}</span>
              </div>
            </div>
          </div>

          <div className={styles.book}>
            <button onClick={book} className={styles.bookButton}>
              {loading ? <span className={styles.loader}></span> : "Book Now"}
            </button>
          </div>
          {alertMessage && (
            <CustomAlert
              message={alertMessage}
              failure={failure}
              onClose={() => {
                setAlertMessage(null);
                if (!failure) {
                  window.location.href = "/";
                }
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default FlightDisplay;
