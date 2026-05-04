import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { CheckCircle2, XCircle, ArrowRight, Lightbulb, ArrowLeft, BookOpen, Clock, Send } from 'lucide-react';
import Button from '../components/Button';
import './ProblemView.css';

const InteractiveQuestion = ({ bank, onSolve }) => {
  const { questionId } = useParams();
  const navigate = useNavigate();
  
  const question = bank?.find(q => q.id === questionId) || bank?.find(q => q.id == questionId);

  const [selectedOption, setSelectedOption] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [solvedCorrectly, setSolvedCorrectly] = useState(false);

  if (!question) {
    return (
      <div className="exam-container">
        <h2>Problem not found!</h2>
        <Button variant="ghost" onClick={() => navigate('/student')}><ArrowLeft size={20} /> Back to Dashboard</Button>
      </div>
    );
  }

  const handleOptionClick = (index) => {
    if (isAnswered) return;
    setSelectedOption(index);
  };

  const handleSubmit = () => {
    if (selectedOption === null || isAnswered) return;
    
    setIsAnswered(true);
    if (selectedOption === question.correctAnswer) {
      setSolvedCorrectly(true);
      if (onSolve) onSolve(question.id, 50);
    }
  };

  const handleNext = () => {
    navigate('/student');
  };

  return (
    <div className="problem-view-container animate-pop-in">
      <header className="problem-header">
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <Button variant="ghost" size="sm" onClick={() => navigate('/student')}>
            <ArrowLeft size={18} /> Problem Set
          </Button>
          <div className="breadcrumb">
            <span style={{ color: 'var(--text-muted)' }}>{question.subject}</span>
            <span style={{ color: 'var(--text-muted)', margin: '0 0.5rem' }}>/</span>
            <span style={{ fontWeight: 600 }}>{question.topic}</span>
          </div>
        </div>
        <div className="problem-meta" style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', fontSize: '0.9rem', color: 'var(--text-muted)' }}>
            <Clock size={16} /> 12:45
          </div>
          <div className={`diff-tag ${question.difficulty.toLowerCase()}`}>
            {question.difficulty}
          </div>
        </div>
      </header>

      <main className="problem-main">
        {/* Left Panel: Description */}
        <section className="problem-left-panel">
          <div className="panel-title">
            <BookOpen size={16} />
            Question Description
          </div>
          <div className="question-content">
            <h2 dangerouslySetInnerHTML={{ __html: question.text }} />
            {question.imageUrl && (
              <div className="question-image-wrapper">
                <img src={question.imageUrl} alt="Question" className="question-image" />
              </div>
            )}
            
            {question.hint && (
              <div className="hint-section" style={{ marginTop: '2rem', justifyContent: 'flex-start' }}>
                {!showHint ? (
                  <Button variant="ghost" size="sm" onClick={() => setShowHint(true)} style={{ padding: 0 }}>
                    <Lightbulb size={16} /> Need a hint?
                  </Button>
                ) : (
                  <div className="hint-box animate-pop-in" style={{ background: 'var(--bg-soft)', color: 'var(--text-dark)', border: '1px dashed var(--warning)' }}>
                    <p><strong>Hint:</strong> {question.hint}</p>
                  </div>
                )}
              </div>
            )}
          </div>
        </section>

        {/* Right Panel: Solving */}
        <section className="problem-right-panel">
          <div className="panel-title">
             <Send size={16} />
             Your Solution
          </div>
          <div className="options-list">
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
                  style={{ justifyContent: 'flex-start', textAlign: 'left' }}
                >
                  <span className="option-letter" style={{ flexShrink: 0 }}>{String.fromCharCode(65 + index)}</span>
                  <div 
                    className="option-text" 
                    style={{ flex: 1 }} 
                    dangerouslySetInnerHTML={{ __html: typeof option === 'string' ? option : option.text }}
                  />
                  {isAnswered && index === question.correctAnswer && <CheckCircle2 className="result-icon correct-icon" />}
                </button>
              );
            })}
          </div>
        </section>
      </main>

      <footer className="problem-footer">
        <div className="footer-left">
          {isAnswered && (
            <div className={`result-banner ${solvedCorrectly ? 'success' : 'error'}`}>
              {solvedCorrectly ? (
                <><CheckCircle2 size={20} /> Correct! You earned 50 stars!</>
              ) : (
                <><XCircle size={20} /> Incorrect. Try reading the explanation.</>
              )}
            </div>
          )}
        </div>
        <div className="footer-right" style={{ display: 'flex', gap: '1rem' }}>
          {!isAnswered ? (
            <Button variant="primary" size="lg" disabled={selectedOption === null} onClick={handleSubmit}>
              Submit Answer
            </Button>
          ) : (
            <Button variant="primary" size="lg" onClick={handleNext}>
              Next Problem <ArrowRight size={20} />
            </Button>
          )}
        </div>
      </footer>
    </div>
  );
};

export default InteractiveQuestion;
