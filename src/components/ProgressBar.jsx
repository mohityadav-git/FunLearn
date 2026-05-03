import React from 'react';
import './ProgressBar.css';

const ProgressBar = ({ progress, label }) => {
  return (
    <div className="progress-container">
      {label && <div className="progress-label">{label}</div>}
      <div className="progress-track">
        <div 
          className="progress-fill" 
          style={{ width: `${Math.max(0, Math.min(100, progress))}%` }}
        ></div>
        <div className="progress-glow" style={{ width: `${Math.max(0, Math.min(100, progress))}%` }}></div>
      </div>
    </div>
  );
};

export default ProgressBar;
