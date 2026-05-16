import React from 'react';
import { useNavigate } from 'react-router-dom';

const BookCard = ({ book }) => {
  const navigate = useNavigate();

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating || 0);
    for (let i = 0; i < 5; i++) {
      stars.push(
        <span key={i} className={`star ${i < fullStars ? 'filled' : ''}`}>
          {i < fullStars ? '★' : '☆'}
        </span>
      );
    }
    return stars;
  };

  return (
    <div className="book-card" onClick={() => navigate(`/book/${book._id}`)}>
      <div className="book-cover">
        📖
      </div>
      <h3 className="book-title">{book.title || 'Untitled'}</h3>
      <p className="book-author">by {book.author || 'Unknown Author'}</p>
      <div className="book-rating">{renderStars(book.averageRating)}</div>
      {book.genre && <p style={{ fontSize: '0.8rem', color: 'var(--color-sage-light)', marginTop: '0.5rem' }}>{book.genre}</p>}
    </div>
  );
};

export default BookCard;