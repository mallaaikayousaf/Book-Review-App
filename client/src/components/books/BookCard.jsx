import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './BookCard.css';

const BookCard = ({ book }) => {
  const navigate = useNavigate();
  const [imgError, setImgError] = useState(false);

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
        {book.coverImage && !imgError ? (
          <img
            src={book.coverImage}
            alt={book.title}
            onError={() => setImgError(true)}
          />
        ) : (
          <div className="book-cover-placeholder">
            <span>📖</span>
            <p>{book.title}</p>
          </div>
        )}
      </div>
      <div className="book-info">
        <h3 className="book-title">{book.title || 'Untitled'}</h3>
        <p className="book-author">by {book.author || 'Unknown Author'}</p>
        <div className="book-rating">{renderStars(book.averageRating)}</div>
        {book.genre && <p className="book-genre">{book.genre}</p>}
      </div>
    </div>
  );
};

export default BookCard;