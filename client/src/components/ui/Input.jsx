import React from 'react';

const Input = ({
  label,
  type = 'text',
  value,
  onChange,
  placeholder,
  required = false,
  error,
  textarea = false,
  rows = 4,
}) => {
  return (
    <div className="form-group">
      {label && <label>{label}</label>}
      {textarea ? (
        <textarea
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          rows={rows}
          style={{
            width: '100%',
            padding: '0.8rem 1rem',
            border: `1px solid ${error ? '#D4B8A8' : 'rgba(156, 175, 136, 0.3)'}`,
            borderRadius: '8px',
            fontFamily: 'var(--font-body)',
            fontSize: '1rem',
            backgroundColor: 'white',
          }}
        />
      ) : (
        <input
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          style={{
            width: '100%',
            padding: '0.8rem 1rem',
            border: `1px solid ${error ? '#D4B8A8' : 'rgba(156, 175, 136, 0.3)'}`,
            borderRadius: '8px',
            fontFamily: 'var(--font-body)',
            fontSize: '1rem',
          }}
        />
      )}
      {error && (
        <p style={{ color: '#D4B8A8', fontSize: '0.85rem', marginTop: '0.3rem' }}>
          {error}
        </p>
      )}
    </div>
  );
};

export default Input;