import React from 'react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer style={{
      background: 'rgba(253, 251, 247, 0.95)',
      borderTop: '1px solid rgba(156, 175, 136, 0.2)',
      padding: '2rem',
      marginTop: 'auto',
      textAlign: 'center',
    }}>
      <div className="container">
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '1rem',
        }}>
          <div>
            <p style={{ 
              fontFamily: 'var(--font-accent)', 
              fontSize: '1.5rem', 
              color: 'var(--color-sage)',
              margin: 0,
            }}>
              ✧ Petals & Pages ✧
            </p>
            <p style={{ fontSize: '0.85rem', color: 'var(--color-text-soft)', marginTop: '0.3rem' }}>
              Where stories bloom into reviews
            </p>
          </div>
          
          <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }}>
            <a href="/" style={{ fontSize: '0.9rem' }}>Home</a>
            <a href="/reading-list" style={{ fontSize: '0.9rem' }}>My Library</a>
            <a href="/profile" style={{ fontSize: '0.9rem' }}>Profile</a>
          </div>
          
          <div>
            <p style={{ fontSize: '0.8rem', color: 'var(--color-text-soft)', margin: 0 }}>
              © {currentYear} Petals & Pages
            </p>
            <p style={{ fontSize: '0.75rem', color: 'var(--color-sage-light)', marginTop: '0.2rem' }}>
              Read beautifully ✦ Review elegantly
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;