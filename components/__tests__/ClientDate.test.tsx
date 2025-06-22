import '@testing-library/jest-dom';
import { render, screen, act } from '@testing-library/react';
import ClientDate from '../ClientDate';

describe('ClientDate', () => {
  // Use fake timers to control useEffect
  jest.useFakeTimers();

  it('formats and displays the date string correctly', () => {
    const testDate = '2024-01-15T12:00:00.000Z';
    render(<ClientDate dateString={testDate} />);

    // Advance timers to trigger useEffect
    act(() => {
      jest.runAllTimers();
    });

    const expectedDate = new Date(testDate).toLocaleDateString();
    expect(screen.getByText(expectedDate)).toBeInTheDocument();
  });
}); 