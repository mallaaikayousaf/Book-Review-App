import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import BookSearch from '../components/books/BookSearch';
import BookList from '../components/books/BookList';
import LoadingSpinner from '../components/common/LoadingSpinner';
import { getBooks } from '../services/bookServices';
import './HomePage.css';

const HomePage = () => {
  const [allBooks, setAllBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('');
  const location = useLocation();

  // Read ?genre= from sidebar navigation
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const genre = params.get('genre') || '';
    setSelectedGenre(genre);
  }, [location.search]);

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      const data = await getBooks();
      setAllBooks(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error('Error fetching books:', error);
      setAllBooks([]);
    } finally {
      setLoading(false);
    }
  };

  const filteredBooks = allBooks.filter(book => {
    const term = searchTerm.toLowerCase();
    const matchesSearch = !term ||
      book.title?.toLowerCase().includes(term) ||
      book.author?.toLowerCase().includes(term);
    const matchesGenre = !selectedGenre || book.genre === selectedGenre;
    return matchesSearch && matchesGenre;
  });

  return (
    <div className="homepage">
      {/* Hero Section */}
      <div className="hero-section">
        <div className="hero-content">
          <div className="hero-flower">✧</div>
          <h1 className="hero-title">
            where stories<br />
            <span className="hero-subtitle">bloom into reviews</span>
          </h1>
          <p className="hero-description">
            Discover your next literary love affair<br />
            through the eyes of fellow dreamers
          </p>
          <div className="hero-quote">
            "A room without books is like a body without a soul"
          </div>
        </div>
      </div>

      {/* Search Section */}
      <div className="search-section">
        <div className="container">
          <BookSearch
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            selectedGenre={selectedGenre}
            setSelectedGenre={setSelectedGenre}
          />
        </div>
      </div>

      {/* Books Section */}
      <div className="books-section">
        <div className="container">
          <div className="section-header">
            <h2>
              {selectedGenre ? `${selectedGenre} Books` : 'Recent Treasures'}
            </h2>
            <div className="section-decoration">✦ ✦ ✦</div>
          </div>

          {loading ? (
            <LoadingSpinner />
          ) : (
            <BookList books={filteredBooks} />
          )}
        </div>
      </div>
    </div>
  );
};

export default HomePage;