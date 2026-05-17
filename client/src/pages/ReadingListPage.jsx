import React, { useState } from 'react';
import { useReadingList } from '../context/ReadingListContext';
import LoadingSpinner from '../components/common/LoadingSpinner';
import { Link } from 'react-router-dom';
import './ReadingListPage.css';

const STATUS_LABELS = {
  'want-to-read': 'Want to Read',
  'reading': 'Reading',
  'read': 'Completed',
};

const STATUS_COLORS = {
  'want-to-read': '#D4B8A8',
  'reading': '#9CAF88',
  'read': '#6B7B5E',
};

const ReadingListPage = () => {
  const { readingList, removeFromReadingList, updateBookStatus, loading } = useReadingList();
  const [statusFilter, setStatusFilter] = useState('all');
  const [updatingId, setUpdatingId] = useState(null);

  const filteredBooks = readingList.filter(item => {
    if (statusFilter === 'all') return true;
    return item.status === statusFilter;
  });

  const handleStatusChange = async (bookId, newStatus) => {
    setUpdatingId(bookId);
    try {
      await updateBookStatus(bookId, newStatus);
    } catch (e) {
      console.error('Failed to update status', e);
    } finally {
      setUpdatingId(null);
    }
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div className="container fade-in reading-list-page">
      <div className="section-header">
        <h2>My Reading List</h2>
        <div className="section-decoration">✦ ✦ ✦</div>
        <p className="reading-list-count">
          {readingList.length} {readingList.length === 1 ? 'book' : 'books'} in your collection
        </p>
      </div>

      {/* Status filter tabs */}
      <div className="status-tabs">
        {['all', 'want-to-read', 'reading', 'read'].map(s => (
          <button
            key={s}
            className={`status-tab ${statusFilter === s ? 'active' : ''}`}
            onClick={() => setStatusFilter(s)}
          >
            {s === 'all' ? 'All' : STATUS_LABELS[s]}
            <span className="tab-count">
              {s === 'all'
                ? readingList.length
                : readingList.filter(i => i.status === s).length}
            </span>
          </button>
        ))}
      </div>

      {filteredBooks.length === 0 ? (
        <div className="empty-state">
          <p className="empty-title">No books here yet</p>
          <p className="empty-subtitle">
            {statusFilter === 'all'
              ? 'Discover books and add them to your collection!'
              : `You have no books marked as "${STATUS_LABELS[statusFilter] || statusFilter}".`}
          </p>
          <Link to="/" className="btn-elegant" style={{ display: 'inline-block', marginTop: '1.5rem', padding: '0.8rem 2rem' }}>
            Browse Books
          </Link>
        </div>
      ) : (
        <div className="reading-list-grid">
          {filteredBooks.map((item) => {
            const book = item.book;
            if (!book) return null;
            return (
              <div key={book._id} className="reading-list-card">
                {/* Cover */}
                <Link to={`/book/${book._id}`} className="reading-list-cover">
                  {book.coverImage ? (
                    <img src={book.coverImage} alt={book.title} />
                  ) : (
                    <div className="cover-placeholder">📖</div>
                  )}
                </Link>

                {/* Info */}
                <div className="reading-list-info">
                  <Link to={`/book/${book._id}`} className="reading-list-title">{book.title}</Link>
                  <p className="reading-list-author">by {book.author}</p>

                  {/* Status Selector */}
                  <div className="status-selector">
                    <span className="status-label">Status:</span>
                    <select
                      value={item.status}
                      onChange={(e) => handleStatusChange(book._id, e.target.value)}
                      disabled={updatingId === book._id}
                      className="status-select"
                      style={{ borderColor: STATUS_COLORS[item.status] }}
                    >
                      <option value="want-to-read">Want to Read</option>
                      <option value="reading">Currently Reading</option>
                      <option value="read">Completed</option>
                    </select>
                  </div>

                  {/* Status badge */}
                  <span
                    className="status-badge"
                    style={{ background: STATUS_COLORS[item.status] + '22', color: STATUS_COLORS[item.status], borderColor: STATUS_COLORS[item.status] + '55' }}
                  >
                    {STATUS_LABELS[item.status] || item.status}
                  </span>

                  {/* Remove button */}
                  <button
                    className="remove-btn"
                    onClick={() => removeFromReadingList(book._id)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default ReadingListPage;