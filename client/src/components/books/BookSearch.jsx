import React from 'react';
import './BookSearch.css';

const BookSearch = ({ searchTerm, setSearchTerm, selectedGenre, setSelectedGenre }) => {
  const genres = ['All', 'Fiction', 'Mystery', 'Romance', 'Fantasy', 'Sci-Fi', 'Biography'];

  return (
    <div className="book-search">
      <div className="search-wrapper">
        <input
          type="text"
          placeholder="Search by title or author..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
        <span className="search-icon">🔍</span>
      </div>
      
      <div className="genre-filters">
        {genres.map(genre => (
          <button
            key={genre}
            className={`genre-btn ${selectedGenre === genre ? 'active' : ''}`}
            onClick={() => setSelectedGenre(genre === 'All' ? '' : genre)}
          >
            {genre}
          </button>
        ))}
      </div>
    </div>
  );
};

export default BookSearch;