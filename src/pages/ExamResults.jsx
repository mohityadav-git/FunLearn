import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Star, RefreshCcw, Home } from 'lucide-react';
import Button from '../components/Button';
import './ExamResults.css';

const ExamResults = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  const score = location.state?.score || 0;
  const total = location.state?.total || 1;
  const percentage = Math.round((score / total) * 100);
  
  let message = "";
  let emoji = "";
  
  if (percentage === 100) {
    message = "Perfect Score!";
    emoji = "🏆";
  } else if (percentage >= 80) {
    message = "Amazing Job!";
    emoji = "🌟";
  } else if (percentage >= 50) {
    message = "Good Effort!";
    emoji = "👍";
  } else {
    message = "Keep Practicing!";
    emoji = "💪";
  }

  return (
    <div className="question-container card-panel animate-slide-up">
      <div className="results-card card-panel">
        <div className="results-header">
          <div className="emoji-celebration bounce-animation">{emoji}</div>
          <h1 className="results-title">{message}</h1>
          <p className="results-subtitle">You completed the quest!</p>
        </div>

        <div className="score-circle-wrapper">
          <svg viewBox="0 0 100 100" className="score-circle">
            <circle cx="50" cy="50" r="45" className="circle-bg" />
            <circle 
              cx="50" 
              cy="50" 
              r="45" 
              className="circle-progress"
              style={{ strokeDasharray: `${percentage * 2.83} 283` }}
            />
          </svg>
          <div className="score-text">
            <span className="score-number">{score}</span>
            <span className="score-divider">/</span>
            <span className="score-total">{total}</span>
          </div>
        </div>

        <div className="rewards-section">
          <div className="reward-badge">
            <Star className="reward-icon" fill="currentColor" />
            <span>+{score * 100} Stars Earned</span>
          </div>
        </div>

        <div className="action-buttons">
          <Button variant="outline" size="lg" fullWidth onClick={() => navigate(-1)}>
            <RefreshCcw size={20} /> Try Again
          </Button>
          <Button variant="primary" size="lg" fullWidth onClick={() => navigate('/dashboard')}>
            <Home size={20} /> Back to Dashboard
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ExamResults;
