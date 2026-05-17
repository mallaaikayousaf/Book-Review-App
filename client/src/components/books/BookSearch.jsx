import React, { useState } from 'react';
import './BookSearch.css';

const BookSearch = ({ searchTerm, setSearchTerm, selectedGenre, setSelectedGenre }) => {
  const [inputValue, setInputValue] = useState(searchTerm);
  const genres = ['All', 'Fiction', 'Romance', 'Fantasy', 'Mystery', 'Thriller', 'Sci-Fi', 'Poetry', 'Biography', 'Non-Fiction', 'History'];

  const handleSearch = () => {
    setSearchTerm(inputValue);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') handleSearch();
  };

  return (
    <div className="book-search">
      <div className="search-wrapper">
        <input
          type="text"
          placeholder="Search by title or author..."
          value={inputValue}
          onChange={(e) => {
            setInputValue(e.target.value);
            setSearchTerm(e.target.value); // live filter
          }}
          onKeyDown={handleKeyDown}
          className="search-input"
        />
        <button className="search-btn" onClick={handleSearch}>
          🔍 Search
        </button>
      </div>

      <div className="genre-filters">
        {genres.map(genre => (
          <button
            key={genre}
            className={`genre-btn ${(genre === 'All' && selectedGenre === '') || selectedGenre === genre ? 'active' : ''}`}
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