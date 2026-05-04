import React, { useState } from 'react';
import { CheckCircle, XCircle } from 'lucide-react';
import './GuestQuizCard.css';

const GuestQuizCard = ({ title, question, options, correctAnswerIndex, onSolveAttempt }) => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [isRevealed, setIsRevealed] = useState(false);

  const handleOptionClick = (index) => {
    if (isRevealed) return;
    
    // Check if allowed to proceed
    const canProceed = onSolveAttempt();
    if (!canProceed) return;

    setSelectedOption(index);
    setIsRevealed(true);
  };

  return (
    <div className="mock-editor guest-quiz-card">
      <div className="mock-editor-header">
        <div className="mock-dots">
          <span></span><span></span><span></span>
        </div>
        <span className="mock-title">{title}</span>
      </div>
      <div className="mock-editor-body quiz-body">
        <p className="quiz-question">{question}</p>
        <div className="quiz-options">
          {options.map((opt, i) => {
            let btnClass = "quiz-opt-btn";
            if (isRevealed) {
              if (i === correctAnswerIndex) btnClass += " correct";
              else if (i === selectedOption) btnClass += " incorrect";
              else btnClass += " disabled";
            }
            return (
              <button 
                key={i} 
                className={btnClass}
                onClick={() => handleOptionClick(i)}
                disabled={isRevealed}
              >
                <span className="opt-text">{opt}</span>
                {isRevealed && i === correctAnswerIndex && <CheckCircle size={18} className="status-icon success" />}
                {isRevealed && i === selectedOption && i !== correctAnswerIndex && <XCircle size={18} className="status-icon error" />}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default GuestQuizCard;
