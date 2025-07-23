export interface FlightSearchFormData {
  returnDate: string;
  source: string;
  destination: string;
  date: string;
  passengers: number;
  class_type: "economy" | "business" | "first_class";
}
