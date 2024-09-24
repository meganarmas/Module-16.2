import React from "react";
import { render, fireEvent, screen } from '@testing-library/react';
import CommentForm from "../component/CommentForm";
import '@testing-library/jest-dom/extend-expect';

test('renders Blog Post header', () => {
    render(<CommentForm />);
    const headerElement = screen.getByText(/Blog Post/i);
    expect(headerElement).toBeInTheDocument();
});

describe('BlogPost', () => {
    it('renders correctly', () => {
        render(<CommentForm />);

        expect(screen.getByLabelText(/title/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/body/i)).toBeInTheDocument();
        expect(screen.getByRole('button', {name: /submit comment/i})).toBeInTheDocument();
    });

    it('handles input changes', () => {
        render(<CommentForm />);

        const titleInput = screen.getByLabelText(/title/i) as HTMLInputElement;
        const bodyInput = screen.getByLabelText(/body/i) as HTMLTextAreaElement;

        fireEvent.change(titleInput, { target: { value: 'Test Title'} });
        fireEvent.change(bodyInput, { target: {value: 'Test Body' } });

        expect(titleInput.value).toBe('Test Title');
        expect(bodyInput.value).toBe('Test Body');
    });

    it('submits the form and stores comment in localStorage', () =>{
        localStorage.clear();

        render(<CommentForm />);

        const titleInput = screen.getByLabelText(/title/i) as HTMLInputElement;
        const bodyInput = screen.getByLabelText(/body/i) as HTMLTextAreaElement;
        const submitButton = screen.getByRole('button', {name: /submit comment/i});

        fireEvent.change(titleInput, { target: { value: 'Test Title'} });
        fireEvent.change(bodyInput, { target: {value: 'Test Body' } });
        fireEvent.change(submitButton);

        const storedComments = localStorage.getItem('comments');
        expect(storedComments).not.toBeNull();

        const commentsArray = storedComments ? JSON.parse(storedComments) : [];
        expect (commentsArray).toHaveLength(1);
        expect(commentsArray[0]).toEqual({ title: 'Test Title', body: 'Test Body' });
    });
});
