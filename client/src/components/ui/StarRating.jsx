import React, { useState } from 'react';

const StarRating = ({ rating, onRatingChange, readonly = false, size = 'medium' }) => {
  const [hoverRating, setHoverRating] = useState(0);
  const [currentRating, setCurrentRating] = useState(rating || 0);

  const sizes = {
    small: '1rem',
    medium: '1.5rem',
    large: '2rem',
  };

  const handleClick = (value) => {
    if (readonly) return;
    setCurrentRating(value);
    if (onRatingChange) onRatingChange(value);
  };

  const displayRating = readonly ? rating : (hoverRating || currentRating);

  return (
    <div style={{ display: 'flex', gap: '0.2rem' }}>
      {[1, 2, 3, 4, 5].map((star) => (
        <span
          key={star}
          onClick={() => handleClick(star)}
          onMouseEnter={() => !readonly && setHoverRating(star)}
          onMouseLeave={() => !readonly && setHoverRating(0)}
          style={{
            fontSize: sizes[size],
            cursor: readonly ? 'default' : 'pointer',
            color: star <= displayRating ? '#8B9D7A' : '#D4B8A8',
            transition: 'all 0.2s ease',
          }}
        >
          {star <= displayRating ? '★' : '☆'}
        </span>
      ))}
    </div>
  );
};

export default StarRating;