import { useState } from "react";
import { convertCurrency } from "../../helpers/convertCurrency";
import { formatDateTime } from "../../helpers/formatData";
import { calculateDuration } from "../../services/calculateDuration";
import type { FlightSearchResult } from "../../types/FlightSearchResult";
import styles from "./RoundTripFlightDisplay.module.css";

function RoundTripFlightDisplay({
  selectedOnward,
  selectedReturn,
  flight,
  passengers,
  selectedCurrency,
  handleOnwardSelect,
  handleReturnSelect,
  tab,
  isSelected,
  setOpen,
}: {
  selectedOnward: FlightSearchResult | null;
  selectedReturn: FlightSearchResult | null;
  flight: FlightSearchResult;
  passengers: number;
  selectedCurrency: string;
  handleOnwardSelect: (type: FlightSearchResult) => void;
  handleReturnSelect: (type: FlightSearchResult) => void;
  tab: string;
  isSelected: boolean;
  setOpen: (open: boolean) => void;
}) {
  const [isLoading, setIsLoading] = useState(false);
  const classTypeFormatted = flight.class_type.toUpperCase();

  const handleSelect = async () => {
    setIsLoading(true);

    setTimeout(() => {
      if (tab === "onwards") {
        handleOnwardSelect(flight);
      } else {
        handleReturnSelect(flight);
        setOpen(true);
      }
      setIsLoading(false);
    }, 300);
  };

  return (
    // <div key={flight.flight_number} className={styles.flightCard }>
    <div
      key={flight.flight_number}
      className={`${styles.flightCard} ${
        (tab === "onwards" &&
          selectedOnward?.flight_number === flight.flight_number) ||
        (tab === "return" &&
          selectedReturn?.flight_number === flight.flight_number)
          ? styles.selectedCard
          : ""
      }`}
      onClick={handleSelect}
    >
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
            <div className={styles.totalFare}>
              {convertCurrency(flight.total_fare, selectedCurrency)}
            </div>
          </div>
        </div>

        <div className={styles.flightCardFooter}>
          <div>
            <div className={styles.fareBreakdown}>
              <div>
                Base price:{" "}
                <span>
                  {convertCurrency(flight.base_price, selectedCurrency)}
                </span>
              </div>
              <div>
                Dynamic Price:{" "}
                <span>
                  {convertCurrency(flight.extra_price, selectedCurrency)}
                </span>
              </div>
            </div>
          </div>

          <div className={styles.book}>
            <button
              onClick={handleSelect}
              className={styles.bookButton}
              disabled={(tab !== "onwards" && !isSelected) || isLoading}
            >
              {isLoading ? <span className={styles.spinner}></span> : "Next"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RoundTripFlightDisplay;
