import React from 'react';

const LoadingSpinner = () => {
  return (
    <div className="loading-spinner">
      <div className="spinner"></div>
      <p className="text-center text-italic" style={{ color: 'var(--color-sage)' }}>
        Loading treasures...
      </p>
    </div>
  );
};

export default LoadingSpinner;