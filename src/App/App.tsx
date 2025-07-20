import Footer from "../components/Footer/Footer";
import { Hero } from "../components/Hero/HeroSection";
import Navbar from "../components/Navbar/Navbar";
import { FlightSearchForm } from "../components/SearchForm/SearchForm";

export function App() {
  return (
    <div>
      <Navbar />
      <Hero/>
      <FlightSearchForm/>
      <Footer />
    </div>
  );
}
