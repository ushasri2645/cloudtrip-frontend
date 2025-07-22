import { useState } from "react";
import { formatDateTime } from "../../helpers/formatData";
import { bookFlight } from "../../services/BookFlight";
import type { FlightSearchResult } from "../../types/FlightSearchResult";
import { CustomAlert } from "../CustomAlert/CustomAlert";
import styles from "./FlightDisplay.module.css";
import { calculateDuration } from "../../services/calculateDuration";
import { convertCurrency } from "../../helpers/convertCurrency";

function FlightDisplay({
  flight,
  passengers,
  selectedCurrency,
}: {
  flight: FlightSearchResult;
  passengers: number;
   selectedCurrency:string
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
          <div className={styles.durationBox}>
            <div className={styles.durationGraphic}>
              <div className={styles.flightEmoji}>✈️</div>
              <div className={styles.durationLine}>
                <span className={styles.durationTime}>
                  {calculateDuration(
                    flight.departure_date,
                    flight.arrival_date
                  )}
                </span>
              </div>
              <div className={styles.durationCircle}></div>
            </div>
          </div>
          <div className={styles.topRightSection}>
            <span className={styles.flightNumber}>{classTypeFormatted}</span>
            <span className={styles.flightNumber}>
              Flight {flight.flight_number}
            </span>
          </div>
        </div>
        <div className={styles.flightCardDetails}>
          <div className={styles.detailBlock}>
            <strong>Departure:</strong>
            <div>{formatDateTime(flight.departure_date)}</div>
          </div>
          <div className={styles.detailBlock}>
            <strong>Arrival:</strong>
            <div>{formatDateTime(flight.arrival_date)}</div>
          </div>
          <div className={styles.detailBlock}>
            <strong>Available Seats:</strong>
            <div>{flight.available_seats}</div>
          </div>
          <div className={styles.detailBlock}>
            <strong>
              Total Fare for {passengers} passenger
              {passengers > 1 ? "s" : ""}:
            </strong>
            <div className={styles.totalFare}>{convertCurrency(flight.total_fare,selectedCurrency)}</div>
          </div>
        </div>

        <div className={styles.flightCardFooter}>
          <div>
            <div className={styles.fareBreakdown}>
              <div>
                Base price: <span>{convertCurrency(flight.base_price, selectedCurrency)}</span>
              </div>
              <div>
                Dynamic Price: <span>{convertCurrency(flight.extra_price,selectedCurrency)}</span>
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
