import { render, screen } from '@testing-library/react';
import App from './App';

test('renders the portfolio positioning', () => {
  window.location.hash = '';
  render(<App />);
  expect(screen.getByText(/Data Analyst & Data Engineer/i)).toBeInTheDocument();
  expect(screen.getByText(/SQL • Python • ETL/i)).toBeInTheDocument();
});
