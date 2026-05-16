import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Auth.css';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    
    try {
      await login(email, password);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card fade-in">
        <div className="auth-header">
          <div className="hero-flower">✧</div>
          <h2>Welcome Back</h2>
          <p style={{ color: 'var(--color-sage)', marginTop: '0.5rem' }}>Continue your literary journey</p>
        </div>

        {error && (
          <div style={{ background: '#FFE4E0', padding: '0.8rem', borderRadius: '8px', marginBottom: '1rem', color: '#B85C50', textAlign: 'center' }}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <label>Email Address</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="hello@literature.com"
            />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="••••••••"
            />
          </div>

          <button type="submit" className="btn-elegant" disabled={loading}>
            {loading ? 'Signing in...' : 'Sign In ✦'}
          </button>
        </form>

        <div className="auth-footer">
          <p style={{ color: 'var(--color-text-soft)' }}>
            New to Petals & Pages?{' '}
            <Link to="/register" style={{ color: 'var(--color-sage)', fontWeight: '500' }}>
              Create an account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;