import { useState } from "react";
import { useCities } from "../../hooks/useCities";
import { fetchFlights } from "../../services/FetchFlights";
import type { FlightSearchFormData } from "../../types/FlightSearchForm";
import type { FlightSearchResult } from "../../types/FlightSearchResult";
import { FlightsDisplay } from "../FlightsDisplay/FlightsDisplay";
import styles from "./SearchForm.module.css";
import { CustomAlert } from "../CustomAlert/CustomAlert";
import { FlightSearchFields } from "../FlightSearchFields/FlightSearchFields";
import { Button } from "../Button/Button";
import { NavigationButtons } from "../NavigationButtons/NavigationButtons";
import { getDate } from "../../helpers/getDate";

export function FlightSearchForm() {
  const [formData, setFormData] = useState<FlightSearchFormData>({
    source: "",
    destination: "",
    date: "",
    passengers: 1,
    class_type: "economy",
  });

  const [loading, setLoading] = useState(false);
  const [flightsLoading, setFlightsLoading] = useState(false);
  const [flights, setFlights] = useState<FlightSearchResult[]>([]);
  const [searched, setSearched] = useState(false);
  const { cities, refetch } = useCities();
  const [alertMessage, setAlertMessage] = useState<string | null>(null);
  const [failure, setFailure] = useState(false);

  const today = new Date();
  const maxDate = new Date(new Date().setMonth(today.getMonth() + 3));

  const todayString = getDate(today);
  const maxDateString = getDate(maxDate);

  const isPrevDisabled = formData.date === todayString;
  const isNextDisabled = formData.date === maxDateString;

  const refresh = async () => {
    setLoading(true);
    await refetch();
    setLoading(false);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
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
      const results = await fetchFlights(data);
      setFlights(results);
      setSearched(true);
      setFailure(false);
    } catch (error) {
      setSearched(false);
      setAlertMessage((error as Error).message);
      setFailure(true);
    } finally {
      setFlightsLoading(false);
    }
  };

  const getFlights = (e: React.FormEvent) => {
    e.preventDefault();
    fetchAndSetFlights(formData);
  };

  const updateDateAndFetchFlights = (days: number) => {
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
        {alertMessage && (
          <CustomAlert
            message={alertMessage}
            failure={failure}
            onClose={() => setAlertMessage(null)}
          />
        )}
        <form onSubmit={getFlights}>
          <FlightSearchFields
            formData={formData}
            handleChange={handleChange}
            cities={cities}
            handleSwap={handleSwap}
            todayString={todayString}
            maxDateString={maxDateString}
          />
          <Button type="submit" disabled={flightsLoading}>
            {flightsLoading ? (
              <div className={styles.buttonSpinner}></div>
            ) : (
              "Search Flights"
            )}
          </Button>
        </form>

        <button
          type="button"
          onClick={refresh}
          disabled={loading}
          className={styles.refreshBtn}
        >
          {loading ? "..." : "Refresh Cities"}
        </button>
      </div>
      {searched && (
        <>
          <NavigationButtons
            isPrevDisabled={isPrevDisabled}
            isNextDisabled={isNextDisabled}
            onPrev={() => updateDateAndFetchFlights(-1)}
            onNext={() => updateDateAndFetchFlights(1)}
          />
          <FlightsDisplay flights={flights} passengers={formData.passengers} />
        </>
      )}
    </div>
  );
}
