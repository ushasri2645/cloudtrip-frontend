import { fireEvent, render, screen } from "@testing-library/react";
import TripSelector from "./TripSelector";

describe("TripSelector Component", () => {
    it("should render both radio buttons", () => {
        render(<TripSelector />);
        expect(screen.getByLabelText(/one way/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/round trip/i)).toBeInTheDocument();
    });

    it("should selects 'One Way' by default", () => {
        render(<TripSelector />);
        const oneWayRadio = screen.getByLabelText(/one way/i) as HTMLInputElement;
        const roundTripRadio = screen.getByLabelText(/round trip/i) as HTMLInputElement;

        expect(oneWayRadio.checked).toBe(true);
        expect(roundTripRadio.checked).toBe(false);
    });

    it("should selects 'Round Trip' when clicked", () => {
        render(<TripSelector />);
        const roundTripRadio = screen.getByLabelText(/round trip/i) as HTMLInputElement;

        fireEvent.click(roundTripRadio);

        expect(roundTripRadio.checked).toBe(true);
        expect((screen.getByLabelText(/one way/i) as HTMLInputElement).checked).toBe(false);
    });

    it("should allows switching from Round Trip back to One Way", () => {
        render(<TripSelector />);
        const oneWayRadio = screen.getByLabelText(/one way/i) as HTMLInputElement;
        const roundTripRadio = screen.getByLabelText(/round trip/i) as HTMLInputElement;
        fireEvent.click(roundTripRadio);
        expect(roundTripRadio.checked).toBe(true);
        fireEvent.click(oneWayRadio);
        expect(oneWayRadio.checked).toBe(true);
    });
});
