import React, { useState, useEffect, useCallback } from 'react';
import ReviewCard from './ReviewCard';
import { getBookReviews, deleteReview } from '../../services/reviewServices';
import LoadingSpinner from '../common/LoadingSpinner';

const ReviewList = ({ bookId }) => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchReviews = useCallback(async () => {
    setLoading(true);
    try {
      const data = await getBookReviews(bookId);
      setReviews(data);
    } catch (error) {
      console.error('Error fetching reviews:', error);
    } finally {
      setLoading(false);
    }
  }, [bookId]);

  useEffect(() => {
    fetchReviews();
  }, [fetchReviews]);

  const handleDelete = async (reviewId) => {
    if (window.confirm('Are you sure you want to delete this review?')) {
      try {
        await deleteReview(reviewId);
        await fetchReviews();
      } catch (error) {
        console.error('Error deleting review:', error);
        alert('Failed to delete review');
      }
    }
  };

  if (loading) return <LoadingSpinner />;

  if (reviews.length === 0) {
    return (
      <div style={{ textAlign: 'center', padding: 'var(--spacing-xl)' }}>
        <p style={{ color: 'var(--color-sage)', fontStyle: 'italic' }}>
          No reviews yet. Be the first to share your thoughts!
        </p>
      </div>
    );
  }

  return (
    <div style={{ marginTop: 'var(--spacing-md)' }}>
      <h3 style={{ marginBottom: '1rem' }}>Community Reviews ({reviews.length})</h3>
      {reviews.map((review) => (
        <ReviewCard key={review._id} review={review} onDelete={handleDelete} />
      ))}
    </div>
  );
};

export default ReviewList;