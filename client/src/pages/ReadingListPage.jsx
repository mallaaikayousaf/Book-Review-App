import React, { useState, useEffect } from 'react';
import { useReadingList } from '../context/ReadingListContext';
import LoadingSpinner from '../components/common/LoadingSpinner';
import BookCard from '../components/books/BookCard';

const ReadingListPage = () => {
  const { readingList, removeFromReadingList, loading } = useReadingList();
  const [statusFilter, setStatusFilter] = useState('all');

  const filteredBooks = readingList.filter(item => {
    if (statusFilter === 'all') return true;
    return item.status === statusFilter;
  });

  if (loading) return <LoadingSpinner />;

  return (
    <div className="container fade-in" style={{ paddingTop: 'var(--spacing-lg)', paddingBottom: 'var(--spacing-lg)' }}>
      <div className="section-header">
        <h2>My Reading List</h2>
        <div className="section-decoration">✦ ✦ ✦</div>
        <p style={{ color: 'var(--color-sage)', marginTop: '0.5rem' }}>
          {readingList.length} treasured books waiting for you
        </p>
      </div>

      <div className="genre-filters" style={{ marginBottom: 'var(--spacing-lg)' }}>
        <button className={`genre-btn ${statusFilter === 'all' ? 'active' : ''}`} onClick={() => setStatusFilter('all')}>All</button>
        <button className={`genre-btn ${statusFilter === 'want-to-read' ? 'active' : ''}`} onClick={() => setStatusFilter('want-to-read')}>Want to Read</button>
        <button className={`genre-btn ${statusFilter === 'currently-reading' ? 'active' : ''}`} onClick={() => setStatusFilter('currently-reading')}>Currently Reading</button>
        <button className={`genre-btn ${statusFilter === 'completed' ? 'active' : ''}`} onClick={() => setStatusFilter('completed')}>Completed</button>
      </div>

      {filteredBooks.length === 0 ? (
        <div className="text-center" style={{ padding: 'var(--spacing-xl)' }}>
          <p className="hero-quote" style={{ fontSize: '1.5rem' }}>Your reading list is empty</p>
          <p style={{ color: 'var(--color-sage)' }}>Time to discover some beautiful books!</p>
        </div>
      ) : (
        <div className="books-grid">
          {filteredBooks.map((item) => (
            <div key={item.book._id} style={{ position: 'relative' }}>
              <BookCard book={item.book} />
              <button 
                onClick={() => removeFromReadingList(item.book._id)}
                style={{
                  position: 'absolute',
                  top: '10px',
                  right: '10px',
                  background: 'var(--color-dusty-rose)',
                  border: 'none',
                  borderRadius: '50%',
                  width: '30px',
                  height: '30px',
                  cursor: 'pointer',
                  color: 'white',
                  fontSize: '1rem'
                }}
              >
                ✕
              </button>
              <div style={{ marginTop: '0.5rem', textAlign: 'center' }}>
                <span style={{ fontSize: '0.8rem', color: 'var(--color-sage)' }}>{item.status.replace('-', ' ')}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ReadingListPage;