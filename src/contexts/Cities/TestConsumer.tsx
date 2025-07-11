import { useContext } from "react";
import { CitiesContext } from "./CitiesContext";

export const TestConsumer = () => {
  const context = useContext(CitiesContext);

  if (!context) return <div>No context</div>;

  return (
    <div>
      {context.loading && <div>Loading...</div>}
      {context.error && <div>Error: {context.error}</div>}
      {context.cities.map((city) => (
        <div key={city}>{city}</div>
      ))}
    </div>
  );
};
