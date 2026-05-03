import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Target, CheckCircle, XCircle, ArrowRight } from 'lucide-react';
import Button from '../components/Button';
import './RoadmapTest.css';

const MOCK_QUESTIONS = [
  { id: 'm1', text: "What is 7 + 5?", options: ["11", "12", "13", "14"], correctAnswer: 1 },
  { id: 'm2', text: "What is 10 - 3?", options: ["5", "6", "7", "8"], correctAnswer: 2 },
  { id: 'm3', text: "Which number is even?", options: ["3", "5", "7", "8"], correctAnswer: 3 },
  { id: 'm4', text: "What comes after 19?", options: ["18", "20", "21", "22"], correctAnswer: 1 },
  { id: 'm5', text: "How many sides does a triangle have?", options: ["2", "3", "4", "5"], correctAnswer: 1 },
];

const RoadmapTest = ({ bank, onComplete }) => {
  const { subjectName, topicId, level, testNum } = useParams();
  const navigate = useNavigate();
  
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  // Generate 5 questions for this test
  useEffect(() => {
    // In a real app, we would filter 'bank' by subjectName, topicId, and level (difficulty)
    // For now, we'll shuffle the mock questions to ensure there are always 5 available for the prototype
    const shuffled = [...MOCK_QUESTIONS].sort(() => 0.5 - Math.random());
    setQuestions(shuffled.slice(0, 5));
  }, [bank, subjectName, topicId, level]);

  if (questions.length === 0) return <div>Loading...</div>;

  const currentQ = questions[currentIndex];

  const handleSelect = (index) => {
    if (isAnswered) return;
    setSelectedOption(index);
    setIsAnswered(true);

    if (index === currentQ.correctAnswer) {
      setScore(prev => prev + 1);
    }
  };

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(prev => prev + 1);
      setSelectedOption(null);
      setIsAnswered(false);
    } else {
      setIsFinished(true);
    }
  };

  const handleFinish = () => {
    // Check if score is 5/5 (100%)
    if (score === 5) {
      // Mark this specific test as complete for the student
      onComplete("Class 1", subjectName, topicId, level, `test${testNum}`);
    }
    // Return to the study plan
    navigate(`/student/subject/${subjectName}/study-plan`);
  };

  if (isFinished) {
    const passed = score === 5;
    return (
      <div className="roadmap-test-container">
        <div className="rt-result-card">
          <div className="rt-result-icon">
            {passed ? '🏆' : '😅'}
          </div>
          <h2>{passed ? "Perfect Score!" : "Almost There!"}</h2>
          <p>
            {passed 
              ? "You passed the test with flying colors! You may now proceed to the next step." 
              : "You need a perfect score (5/5) to unlock the next step. Review the material and try again!"}
          </p>
          <div className="rt-score">
            {score} / 5
          </div>
          <Button onClick={handleFinish} variant={passed ? "primary" : "secondary"}>
            {passed ? "Continue Journey" : "Return to Roadmap"}
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="roadmap-test-container">
      <header className="rt-header">
        <div className="rt-title">
          <h1>Assessment {testNum}</h1>
          <p>{level} Level • {subjectName}</p>
        </div>
        <div className="rt-progress">
          <span>Question {currentIndex + 1} of 5</span>
        </div>
      </header>

      <div className="rt-question-card">
        <h2 className="rt-question-text">{currentQ.text}</h2>
        <div className="rt-options">
          {currentQ.options.map((opt, idx) => {
            let className = "rt-option-btn";
            if (isAnswered) {
              if (idx === currentQ.correctAnswer) className += " correct";
              else if (idx === selectedOption) className += " wrong";
            } else if (idx === selectedOption) {
              className += " selected";
            }

            return (
              <button 
                key={idx}
                className={className}
                onClick={() => handleSelect(idx)}
                disabled={isAnswered}
              >
                {opt}
              </button>
            );
          })}
        </div>

        {isAnswered && (
          <div className="rt-footer animate-slide-up">
            <Button onClick={handleNext}>
              {currentIndex < questions.length - 1 ? 'Next Question' : 'View Results'} <ArrowRight size={18} />
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default RoadmapTest;
