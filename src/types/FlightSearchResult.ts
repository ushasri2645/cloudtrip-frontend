export type FlightSearchResult = {
  flight_number: string;
  source: string;
  destination: string;
  departure_date: string;
  departure_time: string;
  arrival_date: string;
  arrival_time: string;
  class_type: "economy" | "business" | "first_class";
  economy_seats: number;
  business_seats: number;
  first_class_seats: number;
  total_fare: number;
  price_per_person: number;
  base_price: number;
  extra_price: number;
};
