import React from 'react';
import BookCard from './BookCard';

const BookList = ({ books }) => {
  if (!books || books.length === 0) {
    return (
      <div className="text-center" style={{ padding: 'var(--spacing-xl)' }}>
        <p className="hero-quote" style={{ fontSize: '1.5rem' }}>No books found... yet</p>
        <p style={{ color: 'var(--color-sage)' }}>Check back soon for new literary treasures!</p>
      </div>
    );
  }

  return (
    <div className="books-grid">
      {books.map((book) => (
        <BookCard key={book._id} book={book} />
      ))}
    </div>
  );
};

export default BookList;