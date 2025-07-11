import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { App } from './App';

describe('App Component', () => {
  it('renders Navbar component', () => {
    render(<App />);
    const navTextInstances = screen.getAllByText(/CloudTrip/i);
    expect(navTextInstances.length).toBeGreaterThanOrEqual(1);
  });

  it('renders Footer component', () => {
    render(<App />);
    const footerText = screen.getByText(/All rights reserved/i);
    expect(footerText).toBeInTheDocument();
  });
});
