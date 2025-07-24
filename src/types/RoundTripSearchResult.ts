import type { FlightSearchResult } from "./FlightSearchResult"

export type RoundTripSearchResult = {
    onwards : FlightSearchResult[],
    return : FlightSearchResult[],
}