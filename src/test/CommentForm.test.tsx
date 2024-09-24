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
        const { getByLabelText } = render(<CommentForm />);
        
        const titleInput = getByLabelText(/title/i) as HTMLInputElement;
        const bodyInput = getByLabelText(/body/i) as HTMLTextAreaElement;
    
        fireEvent.change(titleInput, { target: { value: 'Test Title' } });
        fireEvent.change(bodyInput, { target: { value: 'Test Body' } });
    
        expect(titleInput.value).toBe('Test Title');
        expect(bodyInput.value).toBe('Test Body');
    });
  
    it('submits the form and stores comment in localStorage', () => {
      const { getByLabelText, getByText } = render(<CommentForm />);
      
      const titleInput = getByLabelText(/title/i) as HTMLInputElement;
      const bodyInput = getByLabelText(/body/i) as HTMLTextAreaElement;
  
      fireEvent.change(titleInput, { target: { value: 'Test Title' } });
      fireEvent.change(bodyInput, { target: { value: 'Test Body' } });
    
      fireEvent.click(getByText(/submit/i));
    
      const keys = Object.keys(localStorage);
      expect(keys.length).toBeGreaterThan(0);
      const storedCommentString = localStorage.getItem(keys[0]);
      expect(storedCommentString).not.toBeNull(); 
    
      const storedComment = JSON.parse(storedCommentString!);
    
      expect(storedComment).toEqual({ title: 'Test Title', body: 'Test Body' });
    });
  });