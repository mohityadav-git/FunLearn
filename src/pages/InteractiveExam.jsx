import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { CheckCircle2, XCircle, ArrowRight, Lightbulb } from 'lucide-react';
import Button from '../components/Button';
import ProgressBar from '../components/ProgressBar';
import './InteractiveExam.css';

const InteractiveExam = ({ exams, onComplete }) => {
  const { examId } = useParams();
  const navigate = useNavigate();
  
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [showHint, setShowHint] = useState(false);

  const exam = exams?.find(e => e.id === examId);
  const questions = exam?.questions || [];

  if (!exam || questions.length === 0) {
    return <div className="exam-container"><h2>Quest not found!</h2></div>;
  }

  const question = questions[currentIndex];
  const progress = ((currentIndex) / questions.length) * 100;

  const handleOptionClick = (index) => {
    if (isAnswered) return;
    setSelectedOption(index);
    setIsAnswered(true);
    
    if (index === question.correctAnswer) {
      setScore(score + 1);
    }
  };

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setSelectedOption(null);
      setIsAnswered(false);
      setShowHint(false);
    } else {
      if (onComplete) {
        onComplete(examId, score * 100);
      }
      navigate('/results', { state: { score, total: questions.length } });
    }
  };

  return (
    <div className="exam-container animate-pop-in">
      <div className="exam-header">
        <Button variant="ghost" onClick={() => navigate('/dashboard')}>
          Cancel
        </Button>
        <div className="progress-wrapper">
          <ProgressBar progress={progress} label={`Question ${currentIndex + 1} of ${questions.length}`} />
        </div>
        <div className="score-badge">
          ✨ {score * 100}
        </div>
      </div>

      <div className="interactive-exam card-panel">
        <h2 className="question-text">{question.text}</h2>
        {question.imageUrl && (
          <div className="question-image-wrapper">
            <img src={question.imageUrl} alt="Question" className="question-image" />
          </div>
        )}
        
        <div className="options-grid">
          {question.options.map((option, index) => {
            let className = "option-btn";
            if (isAnswered) {
              if (index === question.correctAnswer) className += " correct";
              else if (index === selectedOption) className += " incorrect";
              else className += " disabled";
            } else if (selectedOption === index) {
              className += " selected";
            }

            return (
              <button 
                key={index}
                className={className}
                onClick={() => handleOptionClick(index)}
                disabled={isAnswered}
              >
                <div className="option-content" style={{ flex: 1, display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <span className="option-letter">{String.fromCharCode(65 + index)}</span>
                  {typeof option === 'string' ? (
                    <span className="option-text">{option}</span>
                  ) : (
                    <>
                      {option.text && <span className="option-text">{option.text}</span>}
                      {option.imageUrl && (
                        <img 
                          src={option.imageUrl} 
                          alt="option" 
                          style={{ height: '80px', borderRadius: '8px', objectFit: 'contain' }} 
                        />
                      )}
                    </>
                  )}
                </div>
                {isAnswered && index === question.correctAnswer && <CheckCircle2 className="result-icon correct-icon" />}
                {isAnswered && index === selectedOption && index !== question.correctAnswer && <XCircle className="result-icon incorrect-icon" />}
              </button>
            );
          })}
        </div>
      </div>

      {isAnswered && (
        <div className="feedback-section animate-slide-up">
          <div className={`feedback-message ${selectedOption === question.correctAnswer ? 'success' : 'error'}`}>
            {selectedOption === question.correctAnswer ? (
              <h3>🎉 Brilliant! That's correct!</h3>
            ) : (
              <div>
                <h3>Oops! Let's learn from this.</h3>
                <p>The correct answer was <strong>{question.options[question.correctAnswer]}</strong>.</p>
              </div>
            )}
          </div>
          <Button variant="primary" size="lg" onClick={handleNext}>
            {currentIndex === questions.length - 1 ? 'Finish Quest' : 'Next Question'} <ArrowRight size={20} />
          </Button>
        </div>
      )}

      {!isAnswered && (
        <div className="hint-section">
          {!showHint ? (
            <Button variant="ghost" onClick={() => setShowHint(true)}>
              <Lightbulb size={18} /> Need a hint?
            </Button>
          ) : (
            <div className="hint-box animate-pop-in">
              <Lightbulb className="hint-icon" />
              <p>{question.hint}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default InteractiveExam;
