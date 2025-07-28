import React, { useState } from "react";
import type { FlightSearchResult } from "../../types/FlightSearchResult";
import type { RoundTripSearchResult } from "../../types/RoundTripSearchResult";
import RoundTripFlightDisplay from "../RoundTripFlightDisplay/RoundTripFlightDisplay";
import TwoWayFlightDetails from "../TwoWayFlightDisplay/TwoWayFlightDetails";
import styles from "./RoundTripFlightsDisplay.module.css";

type Props = {
  data: RoundTripSearchResult;
  passengers: number;
  selectedCurrency: string;
};

export const RoundTripResults: React.FC<Props> = ({
  data,
  passengers,
  selectedCurrency,
}) => {
  const [activeTab, setActiveTab] = useState<"onwards" | "return">("onwards");
  const [selectedOnward, setSelectedOnward] =
    useState<FlightSearchResult | null>(null);
  const [selectedReturn, setSelectedReturn] =
    useState<FlightSearchResult | null>(null);
  const [open, setOpen] = useState(false);

  const handleOnwardSelect = (flight: FlightSearchResult) => {
    setSelectedOnward(flight);
    setActiveTab("return");
  };

  const handleReturnSelect = (flight: FlightSearchResult) => {
    setSelectedReturn(flight);
  };

  const source = data.onwards[0].source;
  const destination = data.onwards[0].destination;

  const handleTabChange = (tab: "onwards" | "return") => {
    setActiveTab(tab);
  };

  return (
    <div className={styles.container}>
      <div className={styles.tabHeader}>
        <button
          className={`${styles.tabButton} ${
            activeTab === "onwards" ? styles.active : ""
          }`}
          onClick={() => handleTabChange("onwards")}
        >
          {`${source.toUpperCase()} → ${destination.toUpperCase()}`}
        </button>
        <button
          className={`${styles.tabButton} ${
            activeTab === "return" ? styles.active : ""
          }`}
          onClick={() => handleTabChange("return")}
        >
          {`${destination.toUpperCase()} → ${source.toUpperCase()}`}
        </button>
      </div>

      <div className={styles.cardsWrapper}>
        {(activeTab === "onwards" ? data.onwards : data.return).map(
          (flight: FlightSearchResult, index: number) => (
            <RoundTripFlightDisplay
              key={index}
              flight={flight}
              passengers={passengers}
              selectedCurrency={selectedCurrency}
              handleOnwardSelect={handleOnwardSelect}
              handleReturnSelect={handleReturnSelect}
              tab={activeTab}
              isSelected={selectedOnward ? true : false}
              setOpen={setOpen}
            />
          )
        )}
      </div>
      {open && selectedOnward && selectedReturn && (
        <TwoWayFlightDetails
          onwardFlight={selectedOnward}
          returnFlight={selectedReturn}
          onModalClose={() => setOpen(false)}
          passengers={passengers}
        />
      )}
    </div>
  );
};
