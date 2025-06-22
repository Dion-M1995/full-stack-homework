import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import HomePage from '../page';

describe('HomePage', () => {
  it('renders the main heading and navigation buttons', () => {
    render(<HomePage />);

    // Check for the main heading
    expect(screen.getByRole('heading', { name: /welcome to the full stack assessment/i })).toBeInTheDocument();

    // Check for the navigation buttons
    expect(screen.getByRole('link', { name: /go to numbers/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /go to grades/i })).toBeInTheDocument();
  });
}); 