import React, { createContext, useState, useContext, useEffect } from 'react';
import { login as apiLogin, register as apiRegister, getCurrentUser } from '../services/authServices';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState(localStorage.getItem('token'));

  useEffect(() => {
    if (token) {
      loadUser();
    } else {
      setLoading(false);
    }
  }, [token]);

  const loadUser = async () => {
    try {
      const userData = await getCurrentUser();
      setUser(userData);
    } catch (error) {
      console.error('Error loading user:', error);
      localStorage.removeItem('token');
      setToken(null);
    } finally {
      setLoading(false);
    }
  };

  const login = async (email, password) => {
    const response = await apiLogin(email, password);
    const { token: newToken, user: userData } = response;
    localStorage.setItem('token', newToken);
    setToken(newToken);
    setUser(userData);
    return response;
  };

  const register = async (name, email, password) => {
    const response = await apiRegister(name, email, password);
    const { token: newToken, user: userData } = response;
    localStorage.setItem('token', newToken);
    setToken(newToken);
    setUser(userData);
    return response;
  };

  const logout = () => {
    localStorage.removeItem('token');
    setToken(null);
    setUser(null);
  };

  const value = {
    user,
    login,
    register,
    logout,
    loading,
    isAuthenticated: !!user,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};