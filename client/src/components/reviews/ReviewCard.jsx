import React from 'react';
import { useAuth } from '../../context/AuthContext';

const ReviewCard = ({ review, onDelete }) => {
  const { user } = useAuth();
  const isOwner = user && user.id === review.user?._id;

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      stars.push(
        <span key={i} className={`star ${i < rating ? 'filled' : ''}`}>
          {i < rating ? '★' : '☆'}
        </span>
      );
    }
    return stars;
  };

  return (
    <div style={{
      background: 'rgba(255, 255, 255, 0.5)',
      borderRadius: 'var(--radius-md)',
      padding: '1.5rem',
      marginBottom: '1rem',
      border: '1px solid rgba(156, 175, 136, 0.2)',
      transition: 'var(--transition)'
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '0.5rem' }}>
        <div>
          <strong style={{ fontSize: '1.1rem', color: 'var(--color-sage-dark)' }}>
            {review.user?.name || 'Anonymous Reader'}
          </strong>
          <div style={{ marginTop: '0.3rem' }}>{renderStars(review.rating)}</div>
        </div>
        {isOwner && (
          <button 
            onClick={() => onDelete(review._id)}
            style={{
              background: 'none',
              border: 'none',
              color: 'var(--color-dusty-rose)',
              cursor: 'pointer',
              fontSize: '1rem',
              fontFamily: 'var(--font-body)'
            }}
          >
            ✕ Delete
          </button>
        )}
      </div>
      <p style={{ color: 'var(--color-text-soft)', lineHeight: 1.7, marginTop: '0.8rem' }}>
        {review.comment}
      </p>
      <div style={{ marginTop: '0.8rem', fontSize: '0.8rem', color: 'var(--color-sage-light)' }}>
        {new Date(review.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
      </div>
    </div>
  );
};

export default ReviewCard;