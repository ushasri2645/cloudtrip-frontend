import Footer from "../components/Footer/Footer";
import Navbar from "../components/Navbar/Navbar";
import { FlightSearchForm } from "../components/SearchForm/SearchForm";

export function App() {
  return (
    <div>
      <Navbar />
      <FlightSearchForm/>
      <Footer />
    </div>
  );
}
