import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/common/Navbar';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import BookDetailPage from './pages/BookDetailPage';
import ReadingListPage from './pages/ReadingListPage';
import ProfilePage from './pages/ProfilePage';
import { AuthProvider } from './context/AuthContext';
import { ReadingListProvider } from './context/ReadingListContext';
import { ThemeProvider } from './context/ThemeContext';
import './app.css';

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <ReadingListProvider>
          <Router>
            <div className="app">
              <Navbar />
              <main className="fade-in">
                <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/login" element={<LoginPage />} />
                  <Route path="/register" element={<RegisterPage />} />
                  <Route path="/book/:id" element={<BookDetailPage />} />
                  <Route path="/reading-list" element={<ReadingListPage />} />
                  <Route path="/profile" element={<ProfilePage />} />
                </Routes>
              </main>
            </div>
          </Router>
        </ReadingListProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;