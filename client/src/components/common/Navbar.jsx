import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import './Navbar.css';

const Navbar = () => {
  const { user, logout } = useAuth();
  const { isDarkMode, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
    setIsSidebarOpen(false);
  };

  return (
    <>
      <nav className="navbar">
        <div className="nav-container">
          {/* Logo - Now opens sidebar */}
          <button
            className="nav-logo sidebar-toggle"
            onClick={() => setIsSidebarOpen(true)}
            style={{ background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'inherit', display: 'flex', alignItems: 'center', gap: '0.5rem', padding: 0 }}
          >
            <span className="logo-icon">📖</span>
            <span className="logo-text">Petals & Pages</span>
            <span className="logo-dot">✦</span>
          </button>

          {/* Desktop Navigation */}
          <div className="nav-links">
            <Link to="/" className="nav-link">Home</Link>
            {user && (
              <>
                <Link to="/reading-list" className="nav-link">My Library</Link>
                <Link to="/profile" className="nav-link">Profile</Link>
              </>
            )}
          </div>

          {/* Auth Buttons */}
          <div className="nav-auth">
            {user ? (
              <div className="user-menu">
                <span className="user-greeting">Hello, {user.name?.split(' ')[0]}</span>
                <button onClick={handleLogout} className="logout-btn">
                  ✦ Logout ✦
                </button>
              </div>
            ) : (
              <div className="auth-buttons">
                <Link to="/login" className="auth-link login">Sign In</Link>
                <Link to="/register" className="auth-link register">Join</Link>
              </div>
            )}

          </div>
        </div>
      </nav>

      {/* Sidebar Overlay */}
      {isSidebarOpen && (
        <div className="sidebar-overlay" onClick={() => setIsSidebarOpen(false)}></div>
      )}

      {/* Elegant Sidebar */}
      <div className={`sidebar ${isSidebarOpen ? 'open' : ''}`}>
        <div className="sidebar-header">
          <span className="sidebar-title">Menu ✦</span>
          <button className="close-sidebar" onClick={() => setIsSidebarOpen(false)}>✕</button>
        </div>
        <div className="sidebar-content">
          <Link to="/" onClick={() => setIsSidebarOpen(false)} className="sidebar-link">Home</Link>
          <div className="sidebar-divider"></div>

          <h3 className="sidebar-subtitle">Explore Genres</h3>
          <div className="sidebar-genres">
            {['Fiction', 'Romance', 'Fantasy', 'Mystery', 'Poetry', 'Sci-Fi', 'History'].map(genre => (
              <span key={genre} className="sidebar-genre-item" onClick={() => {
                navigate(`/?genre=${genre}`);
                setIsSidebarOpen(false);
              }}>{genre}</span>
            ))}
          </div>

          <div className="sidebar-divider"></div>
          {user ? (
            <>
              <Link to="/reading-list" onClick={() => setIsSidebarOpen(false)} className="sidebar-link">My Library</Link>
              <Link to="/profile" onClick={() => setIsSidebarOpen(false)} className="sidebar-link">Profile</Link>
              <button onClick={handleLogout} className="sidebar-link logout-link" style={{ background: 'none', border: 'none', textAlign: 'left', cursor: 'pointer', width: '100%', padding: 0 }}>Logout</button>
            </>
          ) : (
            <>
              <Link to="/login" onClick={() => setIsSidebarOpen(false)} className="sidebar-link">Sign In</Link>
              <Link to="/register" onClick={() => setIsSidebarOpen(false)} className="sidebar-link">Join</Link>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Navbar;