import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import './Navbar.css';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="navbar">
      <div className="nav-container">
        {/* Logo */}
        <Link to="/" className="nav-logo">
          <span className="logo-icon">📖</span>
          <span className="logo-text">Petals & Pages</span>
          <span className="logo-dot">✦</span>
        </Link>

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

        {/* Mobile Menu Button */}
        <button 
          className="mobile-menu-btn" 
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <span className="menu-icon">{isMenuOpen ? '✕' : '☾'}</span>
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="mobile-menu">
          <Link to="/" onClick={() => setIsMenuOpen(false)}>Home</Link>
          {user && (
            <>
              <Link to="/reading-list" onClick={() => setIsMenuOpen(false)}>My Library</Link>
              <Link to="/profile" onClick={() => setIsMenuOpen(false)}>Profile</Link>
              <button onClick={handleLogout}>Logout</button>
            </>
          )}
          {!user && (
            <>
              <Link to="/login" onClick={() => setIsMenuOpen(false)}>Sign In</Link>
              <Link to="/register" onClick={() => setIsMenuOpen(false)}>Join</Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;