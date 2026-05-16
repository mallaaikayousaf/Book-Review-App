import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { createReview } from '../../services/reviewServices';

const ReviewForm = ({ bookId, onReviewSubmitted }) => {
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [loading, setLoading] = useState(false);
  const [hoveredRating, setHoveredRating] = useState(0);
  const { user } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!user) {
      alert('Please login to write a review');
      return;
    }

    if (!comment.trim()) {
      alert('Please write a review comment');
      return;
    }

    setLoading(true);
    try {
      await createReview(bookId, rating, comment);
      setComment('');
      setRating(5);
      if (onReviewSubmitted) onReviewSubmitted();
      alert('Review submitted successfully!');
    } catch (error) {
      console.error('Error submitting review:', error);
      alert(error.response?.data?.message || 'Failed to submit review');
    } finally {
      setLoading(false);
    }
  };

  const renderStars = () => {
    const stars = [];
    const effectiveRating = hoveredRating || rating;
    
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <span
          key={i}
          onClick={() => setRating(i)}
          onMouseEnter={() => setHoveredRating(i)}
          onMouseLeave={() => setHoveredRating(0)}
          style={{
            fontSize: '2rem',
            cursor: 'pointer',
            color: i <= effectiveRating ? '#8B9D7A' : '#D4B8A8',
            transition: 'var(--transition)',
            marginRight: '0.3rem'
          }}
        >
          ★
        </span>
      );
    }
    return stars;
  };

  return (
    <div style={{
      background: 'rgba(255, 255, 255, 0.7)',
      borderRadius: 'var(--radius-md)',
      padding: '1.5rem',
      border: '1px solid rgba(156, 175, 136, 0.2)'
    }}>
      <h3 style={{ marginBottom: '1rem', color: 'var(--color-sage-dark)' }}>
        ✦ Share Your Thoughts ✦
      </h3>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '1rem' }}>
          <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--color-sage)' }}>
            Your Rating
          </label>
          <div>{renderStars()}</div>
        </div>
        
        <div style={{ marginBottom: '1rem' }}>
          <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--color-sage)' }}>
            Your Review
          </label>
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            rows="4"
            placeholder="What did you think about this book? Share your honest thoughts..."
            style={{
              width: '100%',
              padding: '0.8rem',
              border: '1px solid rgba(156, 175, 136, 0.3)',
              borderRadius: 'var(--radius-sm)',
              fontFamily: 'var(--font-body)',
              fontSize: '1rem',
              resize: 'vertical'
            }}
          />
        </div>
        
        <button 
          type="submit" 
          className="btn-elegant" 
          disabled={loading}
          style={{ width: '100%' }}
        >
          {loading ? 'Submitting...' : 'Submit Review ✦'}
        </button>
      </form>
    </div>
  );
};

export default ReviewForm;