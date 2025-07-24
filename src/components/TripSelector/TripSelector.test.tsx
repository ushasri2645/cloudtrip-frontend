import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import TripSelector from './TripSelector';

describe('TripSelector', () => {
    it('renders both trip type options', () => {
        const mockSetTripType = vi.fn();

        render(<TripSelector tripType="one_way" setTripType={mockSetTripType} />);

        expect(screen.getByLabelText(/one way/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/round trip/i)).toBeInTheDocument();
    });

    it('checks the correct radio based on tripType prop', () => {
        const mockSetTripType = vi.fn();

        const { rerender } = render(
            <TripSelector tripType="one_way" setTripType={mockSetTripType} />
        );

        expect(screen.getByLabelText(/one way/i)).toBeChecked();
        expect(screen.getByLabelText(/round trip/i)).not.toBeChecked();

        rerender(<TripSelector tripType="round_trip" setTripType={mockSetTripType} />);
        expect(screen.getByLabelText(/round trip/i)).toBeChecked();
        expect(screen.getByLabelText(/one way/i)).not.toBeChecked();
    });
    it("calls setTripType with correct value when 'Round Trip' is selected", () => {
        const mockSetTripType = vi.fn();
        render(<TripSelector tripType="one_way" setTripType={mockSetTripType} />);

        const roundTripRadio = screen.getByLabelText("Round Trip") as HTMLInputElement;
        fireEvent.click(roundTripRadio);

        expect(mockSetTripType).toHaveBeenCalledWith("round_trip");
    });
    it("calls setTripType with correct value when 'One Way' is selected", () => {
        const mockSetTripType = vi.fn();
        render(<TripSelector tripType="round_trip" setTripType={mockSetTripType} />);

        const oneWayRadio = screen.getByLabelText("One Way") as HTMLInputElement;
        fireEvent.click(oneWayRadio);

        expect(mockSetTripType).toHaveBeenCalledWith("one_way");
    });


});
