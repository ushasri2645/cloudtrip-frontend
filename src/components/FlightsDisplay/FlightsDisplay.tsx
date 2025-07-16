import type { FlightSearchResult } from "../../types/FlightSearchResult";
import FlightDisplay from "../FlightDisplay/FlightDisplay";
import styles from './FlightsDisplay.module.css';

type Props = {
  flights: FlightSearchResult[];
  passengers: number;
};

export function FlightsDisplay({ flights, passengers }: Props) {
  if (flights.length === 0) {
    return <div className={styles.flash} ><p className={styles.noFlights}>No flights found</p></div>;
  }

  return (
    <div className={styles.container}>
      {flights.map((flight,index) => {
        return <FlightDisplay key={index} flight={flight} passengers={passengers} />
      })}
    </div>
  );
}
