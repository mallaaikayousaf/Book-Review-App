import React, { useState, useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { getBookById } from '../services/bookServices';
import { useAuth } from '../context/AuthContext';
import { useReadingList } from '../context/ReadingListContext';
import LoadingSpinner from '../components/common/LoadingSpinner';
import ReviewList from '../components/reviews/ReviewList';
import ReviewForm from '../components/reviews/ReviewForm';

const BookDetailPage = () => {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const { user } = useAuth();
  const { addToReadingList } = useReadingList();

  const fetchBook = useCallback(async () => {
    try {
      const data = await getBookById(id);
      setBook(data);
    } catch (error) {
      console.error('Error fetching book:', error);
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchBook();
  }, [fetchBook]);

  const handleAddToList = async () => {
    if (!user) {
      alert('Please login to add books to your reading list');
      return;
    }
    await addToReadingList(id);
    alert('Book added to your reading list!');
  };

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating || 0);
    for (let i = 0; i < 5; i++) {
      stars.push(
        <span key={i} className={`star ${i < fullStars ? 'filled' : ''}`} style={{ fontSize: '1.2rem' }}>
          {i < fullStars ? '★' : '☆'}
        </span>
      );
    }
    return stars;
  };

  if (loading) return <LoadingSpinner />;
  if (!book) return <div className="text-center" style={{ padding: 'var(--spacing-xl)' }}>Book not found</div>;

  return (
    <div className="container fade-in" style={{ paddingTop: 'var(--spacing-lg)', paddingBottom: 'var(--spacing-lg)' }}>
      <div style={{ display: 'grid', gridTemplateColumns: '300px 1fr', gap: 'var(--spacing-lg)', alignItems: 'start' }}>
        {/* Book Cover */}
        <div>
          <div style={{ borderRadius: 'var(--radius-md)', overflow: 'hidden', border: '1px solid rgba(156, 175, 136, 0.2)', background: '#e8ddd2', aspectRatio: '2/3', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            {book.coverImage ? (
              <img
                src={book.coverImage}
                alt={book.title}
                style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                onError={(e) => { e.target.style.display='none'; e.target.nextSibling.style.display='flex'; }}
              />
            ) : null}
            <div style={{ display: book.coverImage ? 'none' : 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', width: '100%', height: '100%', gap: '1rem' }}>
              <span style={{ fontSize: '5rem' }}>📖</span>
              <p style={{ fontFamily: 'Playfair Display, serif', color: '#6B7B5E', textAlign: 'center', padding: '0 1rem' }}>{book.title}</p>
            </div>
          </div>
          
          <div style={{ marginTop: 'var(--spacing-md)', display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
            <button onClick={handleAddToList} className="btn-elegant">
              ✦ Add to Reading List ✦
            </button>
            {user && (
              <button onClick={() => setShowReviewForm(!showReviewForm)} className="btn-outline">
                Write a Review
              </button>
            )}
          </div>
        </div>

        {/* Book Details */}
        <div>
          <h1 style={{ fontSize: '3rem', marginBottom: '0.5rem' }}>{book.title}</h1>
          <p style={{ fontSize: '1.3rem', color: 'var(--color-dusty-rose)', fontStyle: 'italic', marginBottom: '1rem' }}>
            by {book.author}
          </p>
          
          <div style={{ marginBottom: '1rem' }}>
            {renderStars(book.averageRating)}
            <span style={{ marginLeft: '0.5rem', color: 'var(--color-sage)' }}>
              ({book.totalReviews || 0} reviews)
            </span>
          </div>

          <div style={{ marginBottom: '1rem' }}>
            <span style={{ background: 'var(--color-beige)', padding: '0.3rem 0.8rem', borderRadius: '20px', fontSize: '0.9rem' }}>
              {book.genre}
            </span>
          </div>

          <div style={{ marginTop: 'var(--spacing-md)' }}>
            <h3>About this book</h3>
            <p style={{ lineHeight: 1.8, color: 'var(--color-text-soft)' }}>{book.description}</p>
          </div>
        </div>
      </div>

      {/* Reviews Section */}
      <div style={{ marginTop: 'var(--spacing-xl)' }}>
        <h2>Reader's Thoughts</h2>
        <div className="section-decoration">✦ ✦ ✦</div>
        
        {showReviewForm && (
          <div style={{ marginTop: 'var(--spacing-md)', marginBottom: 'var(--spacing-md)' }}>
            <ReviewForm bookId={id} onReviewSubmitted={fetchBook} />
          </div>
        )}
        
        <ReviewList bookId={id} />
      </div>
    </div>
  );
};

export default BookDetailPage;