import React, { useState } from "react";

export interface Comment {
    title: string;
    body: string;
}

const CommentForm: React.FC = () => {
    const [comment, setComment] = useState<Comment>({ title: '', body: '' });
    const [comments, setComments] = useState<Comment []>([]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setComment(prev => ({ ... prev, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setComments(prevComments => [... prevComments, comment]);
        setComment({ title: '', body: '' });
    };


    return (
        <div>
        <h1>Blog Posts</h1>
        <form onSubmit={handleSubmit}>
            <div>
            <label htmlFor="title">Title:</label>
            <input
            type="text"
            id="title"
            placeholder= "Title"
            onChange={handleChange}
            required
            />
            </div>

            <div>
                <label htmlFor="body">Body:</label>
                <textarea
                id="body"
                placeholder="Body"
                onChange={handleChange}
                required
                />
            </div>
            <button type="submit">Submit</button>
        </form>

        <h2>Posts</h2>
        <ul>
            {comments.map((comment, index) => (
                <li key={index}>
                    <h4>{comment.title}</h4>
                    <p>{comment.body}</p>
                </li>
            ))}
        </ul>
        </div>
    );
};

export default CommentForm;