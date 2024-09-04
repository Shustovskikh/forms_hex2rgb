import React, { useState } from 'react';
import './HexToRgbConverter.css';

const HexToRgbConverter = () => {
  const [hex, setHex] = useState('');
  const [rgb, setRgb] = useState('');
  const [error, setError] = useState(false);

  const hexToRgb = (hex) => {
    const trimmedHex = hex.replace('#', '');
    if (trimmedHex.length !== 6) return null;

    const bigint = parseInt(trimmedHex, 16);
    const r = (bigint >> 16) & 255;
    const g = (bigint >> 8) & 255;
    const b = bigint & 255;

    return `rgb(${r}, ${g}, ${b})`;
  };

  const handleChange = (e) => {
    const value = e.target.value;
    setHex(value);

    if (value.length === 7) {
      const rgbColor = hexToRgb(value);
      if (rgbColor) {
        setRgb(rgbColor);
        setError(false);
      } else {
        setRgb('');
        setError(true);
      }
    } else {
      setRgb('');
      setError(false);
    }
  };

  return (
    <div
      className="converter-container"
      style={{ backgroundColor: error ? '#e74c3c' : rgb }}
    >
      <input
        type="text"
        value={hex}
        onChange={handleChange}
        placeholder="#000000"
        maxLength="7"
        className="hex-input"
      />
      {error ? (
        <div className="error-message">Ошибка!</div>
      ) : (
        <div className="rgb-output">{rgb}</div>
      )}
    </div>
  );
};

export default HexToRgbConverter;
