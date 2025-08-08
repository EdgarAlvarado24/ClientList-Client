import React from 'react';

function LoadingScreen({ isVisible, message = "Procesando..." }) {
  if (!isVisible) return null;

  return (
    <div className="loading-screen">
      <div className="loading-content">
        <div className="loading-spinner"></div>
        <p className="loading-message">{message}</p>
      </div>
    </div>
  );
}

export default LoadingScreen; 