import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App'; 

test('renders blog posts heading', () => {
  render(<App />);
  const headingElement = screen.getByText(/blog posts/i);
  expect(headingElement).toBeInTheDocument();
});