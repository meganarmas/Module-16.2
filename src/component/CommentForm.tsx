import React, { useState } from 'react';

const CommentForm = () => {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent default form submission

    // Create a comment object
    const comment = { title, body };

    // Store in localStorage
    localStorage.setItem(`comment-${Date.now()}`, JSON.stringify(comment));

    // Reset form fields
    setTitle('');
    setBody('');
  };

  return (
    <form onSubmit={handleSubmit}>
        <h1>Blog Posts</h1>
      <div>
        <label htmlFor="title">Title:</label>
        <input
          id="title"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="body">Body:</label>
        <textarea
          id="body"
          placeholder="Body"
          value={body}
          onChange={(e) => setBody(e.target.value)}
          required
        />
      </div>
      <button type="submit">Submit</button>
    </form>
  );
};

export default CommentForm;
