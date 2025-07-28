import AboutUs from "../components/AboutUs/AboutUs";
import { Hero } from "../components/Hero/HeroSection";
import { FlightSearchForm } from "../components/SearchForm/SearchForm";
import SpecialOffers from "../components/SpecialOffers/SpecialOffers";

export default function HomePage() {
  return (
    <>
      <Hero />
      <FlightSearchForm />
      <SpecialOffers />
      <AboutUs />
    </>
  );
}
