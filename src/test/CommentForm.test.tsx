import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import CommentForm from '../component/CommentForm';
import '@testing-library/jest-dom';

describe('CommentForm', () => {
    it('renders correctly', () => {
      const { getByPlaceholderText } = render(<CommentForm />);
      expect(getByPlaceholderText(/title/i)).toBeInTheDocument();
      expect(getByPlaceholderText(/body/i)).toBeInTheDocument();
    });
  
    it('handles input changes', () => {
      const { getByPlaceholderText } = render(<CommentForm />);
      const titleInput = getByPlaceholderText(/title/i);
      const bodyInput = getByPlaceholderText(/body/i);
  
      fireEvent.change(titleInput, { target: { value: 'Test Title' } });
      fireEvent.change(bodyInput, { target: { value: 'Test Body' } });
  
      expect(titleInput.value).toBe('Test Title');
      expect(bodyInput.value).toBe('Test Body');
    });
  
   it('submits the form and stores comment in localStorage', () => {
    const { getByPlaceholderText, getByText } = render(<CommentForm />);
    const titleInput = getByPlaceholderText(/title/i);
    const bodyInput = getByPlaceholderText(/body/i);

    fireEvent.change(titleInput, { target: { value: 'Test Title' } });
    fireEvent.change(bodyInput, { target: { value: 'Test Body' } });
    fireEvent.click(getByText(/submit/i));

    const keys = Object.keys(localStorage);
    expect(keys.length).toBeGreaterThan(0); // Ensure something was stored
    const storedComment = JSON.parse(localStorage.getItem(keys[0])); // Get the most recent item stored

    expect(storedComment).toEqual({ title: 'Test Title', body: 'Test Body' });
    });
  });