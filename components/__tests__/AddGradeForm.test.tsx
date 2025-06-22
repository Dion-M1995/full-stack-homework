import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import AddGradeForm from '../AddGradeForm';

// Mock the server action
jest.mock('@/services/actions', () => ({
  addGrade: jest.fn(),
}));

describe('AddGradeForm', () => {
  it('shows a validation error for grades greater than 100', async () => {
    render(<AddGradeForm />);

    const gradeInput = screen.getByLabelText(/grade/i);
    const submitButton = screen.getByRole('button', { name: /add grade/i });

    // Type an invalid grade
    await fireEvent.change(gradeInput, { target: { value: '101' } });

    // Check for the error message
    expect(await screen.findByText('Grade must be a number between 0 and 100.')).toBeInTheDocument();
    
    // Check that the button is disabled
    expect(submitButton).toBeDisabled();
  });

  it('shows a validation error for grades less than 0', async () => {
    render(<AddGradeForm />);

    const gradeInput = screen.getByLabelText(/grade/i);
    const submitButton = screen.getByRole('button', { name: /add grade/i });

    // Type an invalid grade
    await fireEvent.change(gradeInput, { target: { value: '-1' } });

    // Check for the error message
    expect(await screen.findByText('Grade must be a number between 0 and 100.')).toBeInTheDocument();
    
    // Check that the button is disabled
    expect(submitButton).toBeDisabled();
  });

  it('does not show an error for a valid grade', async () => {
    render(<AddGradeForm />);

    const gradeInput = screen.getByLabelText(/grade/i);
    const submitButton = screen.getByRole('button', { name: /add grade/i });

    // Type a valid grade
    await fireEvent.change(gradeInput, { target: { value: '85' } });

    // Check that the error message is not present
    expect(screen.queryByText('Grade must be a number between 0 and 100.')).not.toBeInTheDocument();
    
    // Check that the button is enabled
    expect(submitButton).not.toBeDisabled();
  });
});
