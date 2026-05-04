import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Book, Map, Compass, Swords, ArrowLeft, ChevronRight } from 'lucide-react';
import Button from '../components/Button';
import './SubjectHub.css';

const SubjectHub = () => {
  const { subjectName } = useParams();
  const navigate = useNavigate();

  const options = [
    {
      id: 'library',
      title: 'Library',
      description: 'The ultimate W3Schools-style continuous learning manual.',
      icon: <Book size={40} />,
      color: '#3b82f6',
      bg: '#dbeafe'
    },
    {
      id: 'study-plan',
      title: 'Study Plan',
      description: 'Follow a structured learning path with milestones and goals.',
      icon: <Map size={40} />,
      color: '#8b5cf6',
      bg: '#ede9fe'
    },
    {
      id: 'explore',
      title: 'Explore',
      description: 'Discover new topics and tackle recommended challenges.',
      icon: <Compass size={40} />,
      color: '#ec4899',
      bg: '#fce7f3'
    },
    {
      id: 'quest',
      title: 'Quest',
      description: 'The ultimate problem-solving arena. Level up your skills!',
      icon: <Swords size={40} />,
      color: '#f59e0b',
      bg: '#fef3c7'
    }
  ];

  const handleOptionClick = (optionId) => {
    navigate(`/student/subject/${subjectName}/${optionId}`);
  };

  return (
    <div className="subject-hub-container animate-slide-up">
      <header className="hub-header">
        <Button variant="ghost" onClick={() => navigate('/student')}>
          <ArrowLeft size={18} /> Back to Dashboard
        </Button>
        <div className="hub-title-section">
          <h1>{subjectName} Hub</h1>
          <p>Select your path to mastery in {subjectName}.</p>
        </div>
      </header>

      <div className="hub-options-grid">
        {options.map((opt) => (
          <div 
            key={opt.id} 
            className="hub-card card-panel"
            onClick={() => handleOptionClick(opt.id)}
            style={{ '--card-color': opt.color }}
          >
            <div className="hub-card-icon" style={{ backgroundColor: opt.bg, color: opt.color }}>
              {opt.icon}
            </div>
            <div className="hub-card-content">
              <h3>{opt.title}</h3>
              <p>{opt.description}</p>
            </div>
            <div className="hub-card-footer">
              <span>Enter {opt.title}</span>
              <ChevronRight size={18} />
            </div>
          </div>
        ))}
      </div>

      <section className="hub-info card-panel">
        <div className="info-text">
          <h3>Progress in {subjectName}</h3>
          <p>You have completed 45% of the core curriculum. Keep going!</p>
        </div>
        <div className="info-stats">
          <div className="stat-item">
            <span className="stat-value">12/28</span>
            <span className="stat-label">Topics Mastered</span>
          </div>
          <div className="stat-item">
            <span className="stat-value">450</span>
            <span className="stat-label">Stars Earned</span>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SubjectHub;
