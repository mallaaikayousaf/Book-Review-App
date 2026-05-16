import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useReadingList } from '../context/ReadingListContext';

const ProfilePage = () => {
  const { user, logout } = useAuth();
  const { readingList } = useReadingList();

  const stats = {
    totalBooks: readingList.length,
    completed: readingList.filter(item => item.status === 'completed').length,
    reading: readingList.filter(item => item.status === 'currently-reading').length,
    wantToRead: readingList.filter(item => item.status === 'want-to-read').length,
  };

  return (
    <div className="container fade-in" style={{ paddingTop: 'var(--spacing-lg)', paddingBottom: 'var(--spacing-lg)' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        {/* Profile Header */}
        <div style={{ textAlign: 'center', marginBottom: 'var(--spacing-lg)' }}>
          <div className="hero-flower" style={{ fontSize: '3rem' }}>✧</div>
          <h1 style={{ marginBottom: '0.5rem' }}>{user?.name}</h1>
          <p style={{ color: 'var(--color-sage)', fontSize: '1.1rem' }}>{user?.email}</p>
          <p style={{ color: 'var(--color-dusty-rose)', fontStyle: 'italic', marginTop: '0.5rem' }}>
            Member since {new Date(user?.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long' })}
          </p>
        </div>

        {/* Reading Stats */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: 'var(--spacing-md)',
          marginBottom: 'var(--spacing-lg)'
        }}>
          <div style={{ textAlign: 'center', padding: '1rem', background: 'rgba(255,255,255,0.5)', borderRadius: 'var(--radius-md)' }}>
            <div style={{ fontSize: '2rem', fontWeight: 'bold', color: 'var(--color-sage-dark)' }}>{stats.totalBooks}</div>
            <div style={{ color: 'var(--color-text-soft)' }}>Total Books</div>
          </div>
          <div style={{ textAlign: 'center', padding: '1rem', background: 'rgba(255,255,255,0.5)', borderRadius: 'var(--radius-md)' }}>
            <div style={{ fontSize: '2rem', fontWeight: 'bold', color: 'var(--color-sage-dark)' }}>{stats.completed}</div>
            <div style={{ color: 'var(--color-text-soft)' }}>Completed</div>
          </div>
          <div style={{ textAlign: 'center', padding: '1rem', background: 'rgba(255,255,255,0.5)', borderRadius: 'var(--radius-md)' }}>
            <div style={{ fontSize: '2rem', fontWeight: 'bold', color: 'var(--color-sage-dark)' }}>{stats.reading}</div>
            <div style={{ color: 'var(--color-text-soft)' }}>Currently Reading</div>
          </div>
          <div style={{ textAlign: 'center', padding: '1rem', background: 'rgba(255,255,255,0.5)', borderRadius: 'var(--radius-md)' }}>
            <div style={{ fontSize: '2rem', fontWeight: 'bold', color: 'var(--color-sage-dark)' }}>{stats.wantToRead}</div>
            <div style={{ color: 'var(--color-text-soft)' }}>Want to Read</div>
          </div>
        </div>

        {/* Reading Journey */}
        <div style={{ marginBottom: 'var(--spacing-lg)' }}>
          <h2 style={{ textAlign: 'center', marginBottom: '0.5rem' }}>Reading Journey</h2>
          <div className="section-decoration" style={{ textAlign: 'center' }}>✦ ✦ ✦</div>
          <div style={{ marginTop: '1.5rem', height: '8px', background: 'var(--color-beige)', borderRadius: '4px', overflow: 'hidden' }}>
            <div style={{
              width: `${(stats.completed / (stats.totalBooks || 1)) * 100}%`,
              height: '100%',
              background: 'var(--gradient-sage)',
              transition: 'width 0.5s ease'
            }}></div>
          </div>
          <p style={{ textAlign: 'center', marginTop: '0.5rem', color: 'var(--color-sage)' }}>
            {stats.completed} of {stats.totalBooks} books completed
          </p>
        </div>

        {/* Logout Button */}
        <div style={{ textAlign: 'center' }}>
          <button onClick={logout} className="btn-outline" style={{ padding: '0.8rem 2rem' }}>
            ✦ Sign Out ✦
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;