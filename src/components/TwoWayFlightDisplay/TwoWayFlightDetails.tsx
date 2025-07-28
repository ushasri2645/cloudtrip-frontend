import React, { useState } from "react";
import { formatUTCToISTString } from "../../helpers/formatData";
import { bookTwoWayFlight } from "../../services/BookTwoWayFlight";
import type { FlightSearchResult } from "../../types/FlightSearchResult";
import { CustomAlert } from "../CustomAlert/CustomAlert";
import styles from "./TwoWayFlightDetails.module.css";

type Props = {
  onwardFlight: FlightSearchResult;
  returnFlight: FlightSearchResult;
  onModalClose: () => void;
  passengers: number;
};

const TwoWayFlightDetails: React.FC<Props> = ({
  onwardFlight,
  returnFlight,
  onModalClose,
  passengers,
}) => {
  const combinedFare =
    Number(onwardFlight.total_fare) + Number(returnFlight.total_fare);
  const discount = parseFloat((combinedFare * 0.05).toFixed(2));
  const finalFare = parseFloat((combinedFare - discount).toFixed(2));
  const [loading, setLoading] = useState(false);
  const [alertMessage, setAlertMessage] = useState<string | null>(null);
  const [failure, setFailure] = useState(false);


  const book = async () => {
    try {
      setLoading(true);
      const isBooked = await bookTwoWayFlight(
        onwardFlight,
        returnFlight,
        passengers
      );
      if (isBooked) {
        setAlertMessage("Round Trip Booking Successful!");
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
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <button className={styles.closeButton} onClick={onModalClose}>
          ✕
        </button>
        <h2 className={styles.title}>Round Trip Flight Details</h2>
        <div className={styles.flightSection}>
          <h3 className={styles.subTitle}>Onward Flight</h3>
          <div className={styles.detailsGrid}>
            <p>
              <strong className={styles.label}>Flight:</strong>{" "}
              {onwardFlight.flight_number}
            </p>
            <p>
              <strong className={styles.label}>Class:</strong>{" "}
              {onwardFlight.class_type}
            </p>
            <p>
              <strong className={styles.label}>Route:</strong>{" "}
              {onwardFlight.source} → {onwardFlight.destination}
            </p>
            <p>
              <strong className={styles.label}>Departure:</strong>{" "}
              {formatUTCToISTString(onwardFlight.departure_date)} 
            </p>
            <p>
              <strong className={styles.label}>Arrival:</strong>{" "}
              {formatUTCToISTString(onwardFlight.arrival_date)} 
            </p>
            <p>
              <strong className={styles.label}>Fare:</strong> ₹
              {onwardFlight.total_fare}
            </p>
          </div>
        </div>

        <div className={styles.flightSection}>
          <h3 className={styles.subTitle}>Return Flight</h3>
          <div className={styles.detailsGrid}>
            <p>
              <strong className={styles.label}>Flight:</strong>{" "}
              {returnFlight.flight_number}
            </p>
            <p>
              <strong className={styles.label}>Class:</strong>{" "}
              {returnFlight.class_type}
            </p>
            <p>
              <strong className={styles.label}>Route:</strong>{" "}
              {returnFlight.source} → {returnFlight.destination}
            </p>
            <p>
              <strong className={styles.label}>Departure:</strong>{" "}
              {formatUTCToISTString(returnFlight.departure_date)}
            </p>
            <p>
              <strong className={styles.label}>Arrival:</strong>{" "}
              {formatUTCToISTString(returnFlight.arrival_date)} 
            </p>
            <p>
              <strong className={styles.label}>Fare:</strong> ₹
              {returnFlight.total_fare}
            </p>
          </div>
        </div>

        <div className={styles.summary}>
          <p>
            <strong className={styles.label}>
              Total Fare (Before Discount):
            </strong>{" "}
            ₹{combinedFare}
          </p>
          <p>
            <strong className={styles.label}>Discount (5%):</strong> ₹{discount}
          </p>
          <p className={styles.finalFare}>
            <strong className={styles.label}>Final Fare:</strong> ₹{finalFare}
          </p>
        </div>

        <button onClick={book} className={styles.bookButton}>
          {loading ? <span className={styles.spinner}></span> : "Book Now"}
        </button>
        {alertMessage && (
          <CustomAlert
            message={alertMessage}
            failure={failure}
            onClose={() => {
              setAlertMessage(null);
              onModalClose();
              if (!failure) {
                window.location.href = "/";
              }
            }}
          />
        )}
      </div>
    </div>
  );
};

export default TwoWayFlightDetails;
