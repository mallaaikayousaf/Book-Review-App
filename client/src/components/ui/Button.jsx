import React from 'react';

const Button = ({ 
  children, 
  variant = 'primary', 
  size = 'medium', 
  onClick, 
  disabled = false,
  fullWidth = false,
  type = 'button'
}) => {
  const variants = {
    primary: 'btn-elegant',
    outline: 'btn-outline',
  };
  
  const sizes = {
    small: { padding: '0.4rem 1.2rem', fontSize: '0.85rem' },
    medium: { padding: '0.7rem 1.8rem', fontSize: '1rem' },
    large: { padding: '1rem 2.5rem', fontSize: '1.1rem' },
  };
  
  return (
    <button
      type={type}
      className={variants[variant]}
      onClick={onClick}
      disabled={disabled}
      style={{
        ...sizes[size],
        width: fullWidth ? '100%' : 'auto',
        cursor: disabled ? 'not-allowed' : 'pointer',
        opacity: disabled ? 0.6 : 1,
      }}
    >
      {children}
    </button>
  );
};

export default Button;