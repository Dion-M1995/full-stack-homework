import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import AddNumberForm from '../AddNumberForm';

// Mock the server action
jest.mock('@/services/actions', () => ({
  addNumber: jest.fn(),
}));

describe('AddNumberForm', () => {
  it('renders the form with an input and a button', () => {
    render(<AddNumberForm />);

    // Check for the number input
    expect(screen.getByLabelText(/enter an integer/i)).toBeInTheDocument();

    // Check for the submit button
    expect(screen.getByRole('button', { name: /add number/i })).toBeInTheDocument();
  });
}); 