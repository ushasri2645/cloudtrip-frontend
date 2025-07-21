import AboutUs from "../components/AboutUs/AboutUs";
import Footer from "../components/Footer/Footer";
import { Hero } from "../components/Hero/HeroSection";
import Navbar from "../components/Navbar/Navbar";
import { FlightSearchForm } from "../components/SearchForm/SearchForm";
import SpecialOffers from "../components/SpecialOffers/SpecialOffers";

export function App() {
  return (
    <div>
      <Navbar />
      <Hero />
      <FlightSearchForm />
      <SpecialOffers />
      <AboutUs />
      <Footer />
    </div>
  );
}
