import { useState } from "react";
import { getDate } from "../../helpers/getDate";
import { useCities } from "../../hooks/useCities";
import { fetchFlights } from "../../services/FetchFlights";
import { fetchRoundTripFlights } from "../../services/FetchRoundTripFlight";
import type { FlightSearchFormData } from "../../types/FlightSearchForm";
import type { FlightSearchResult } from "../../types/FlightSearchResult";
import type { RoundTripSearchResult } from "../../types/RoundTripSearchResult";
import { Button } from "../Button/Button";
import { FlightsDisplay } from "../FlightsDisplay/FlightsDisplay";
import { FlightSearchFields } from "../FlightSearchFields/FlightSearchFields";
import { NavigationButtons } from "../NavigationButtons/NavigationButtons";
import { RoundTripResults } from "../RoundTripFlightsDisplay/RoundTripFlightsDisplay";
import styles from "./SearchForm.module.css";

export function FlightSearchForm() {
  const [formData, setFormData] = useState<FlightSearchFormData>({
    source: "",
    destination: "",
    date: "",
    passengers: 1,
    class_type: "economy",
    returnDate: "",
  });

  const [flightsLoading, setFlightsLoading] = useState(false);
  const [flights, setFlights] = useState<FlightSearchResult[]>([]);
  const [roundtripFlights, setRoundTripFlights] =
    useState<RoundTripSearchResult>({ onwards: [], return: [] });
  const [searched, setSearched] = useState(false);
  const { cities } = useCities();
  const [alertMessage, setAlertMessage] = useState<string | null>(null);
  const [selectedCurrency, setSelectedCurrency] = useState("INR");
  const [tripType, setTripType] = useState("one_way");

  const today = new Date();
  const maxDate = new Date(new Date().setMonth(today.getMonth() + 3));

  const todayString = getDate(today);
  const maxDateString = getDate(maxDate);

  const isPrevDisabled = formData.date === todayString;
  const isNextDisabled = formData.date === maxDateString;

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleCurrencyChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCurrency(e.target.value);
  };

  const handleSwap = () => {
    setFormData((prevData) => ({
      ...prevData,
      source: prevData.destination,
      destination: prevData.source,
    }));
  };

  const fetchAndSetFlights = async (data: FlightSearchFormData) => {
    setFlightsLoading(true);
    try {
      if (!cities.includes(data.source) || !cities.includes(data.destination)) {
        setAlertMessage("Invalid City selected.");
        return;
      }
      if (
        formData.source === formData.destination
      ) {
        setSearched(false);
        setAlertMessage("Source and Destination should not be same.");
        return;
      }
      if (tripType === "one_way") {
        const results = await fetchFlights(data);
        setFlights(results);
        setSearched(true);
      } else {
        const roundTripResults = await fetchRoundTripFlights(data);
        if (
          roundTripResults.onwards.length === 0 ||
          roundTripResults.return.length === 0
        ) {
          setAlertMessage("No Flights available on this route for round trip.");
        } else {
          setRoundTripFlights(roundTripResults);
        }
      }
    } catch (error) {
      setSearched(false);
      setAlertMessage((error as Error).message);
    } finally {
      setFlightsLoading(false);
    }
  };

  const getFlights = (e: React.FormEvent) => {
    e.preventDefault();
    setAlertMessage(null);
    fetchAndSetFlights(formData);
  };

  const updateDateAndFetchFlights = (days: number) => {
    setAlertMessage(null);
    const currentDate = new Date(formData.date);
    currentDate.setDate(currentDate.getDate() + days);
    const newDateStr = currentDate.toISOString().split("T")[0];
    const updatedFormData = { ...formData, date: newDateStr };
    setFormData(updatedFormData);
    fetchAndSetFlights(updatedFormData);
  };

  return (
    <div>
      <div className={styles.container}>
        <form onSubmit={getFlights}>
          <FlightSearchFields
            formData={formData}
            handleChange={handleChange}
            cities={cities}
            handleSwap={handleSwap}
            todayString={todayString}
            maxDateString={maxDateString}
            handleCurrencyChange={handleCurrencyChange}
            selectedCurrency={selectedCurrency}
            returnDate={""}
            tripType={tripType}
            setTripType={setTripType}
          />
          <Button type="submit">Search Flights</Button>

          {flightsLoading && (
            <div className={styles.modalOverlay}>
              <div className={styles.modal}>
                <div className={styles.spinner}></div>
              </div>
            </div>
          )}
        </form>
      </div>
      {(alertMessage || searched) && tripType === "one_way" && (
        <NavigationButtons
          isPrevDisabled={isPrevDisabled}
          isNextDisabled={isNextDisabled}
          onPrev={() => updateDateAndFetchFlights(-1)}
          onNext={() => updateDateAndFetchFlights(1)}
        />
      )}
      {searched && tripType === "one_way" ? (
        <FlightsDisplay
          flights={flights}
          passengers={formData.passengers}
          selectedCurrency={selectedCurrency}
        />
      ) : (
        <>
          {roundtripFlights.onwards.length > 0 &&
            roundtripFlights.return.length > 0 && (
              <RoundTripResults
                data={roundtripFlights}
                passengers={formData.passengers}
                selectedCurrency={selectedCurrency}
              />
            )}
        </>
      )}
      {alertMessage && (
        <div className={styles.alertMessageContainer}>
          <p className={styles.alertMessage}>{alertMessage}</p>
        </div>
      )}
    </div>
  );
}
