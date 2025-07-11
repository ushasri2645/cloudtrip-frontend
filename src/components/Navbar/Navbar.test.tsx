import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import Navbar from './Navbar';
import styles from './Navbar.module.css';

describe('Navbar Component', () => {
    it('renders without crashing', () => {
        render(<Navbar />);
        const brandName = screen.getByText(/CloudTrip/i);
        expect(brandName).toBeInTheDocument();
    });

    it('renders logo image with correct alt text', () => {
        render(<Navbar />);
        const logo = screen.getByAltText(/CloudTrip Logo/i);
        expect(logo).toBeInTheDocument();
        expect(logo).toHaveAttribute('src');
    });

    it('has the correct class names applied', () => {
        render(<Navbar />);
        const navElement = screen.getByRole('navigation');
        expect(navElement).toHaveClass(styles.navbar);
    });
});
