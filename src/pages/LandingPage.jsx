import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Sparkles, Calculator, BookA, FlaskConical, Languages, Puzzle, PenTool } from 'lucide-react';
import Button from '../components/Button';
import ThemeToggle from '../components/ThemeToggle';
import './LandingPage.css';

const SUBJECTS = [
  { id: 'Mathematics', title: 'Mathematics', desc: 'The language of numbers. Master arithmetic and geometry.', icon: <Calculator size={32} />, color: '#10b981' },
  { id: 'English', title: 'English', desc: 'The language of expression. Master grammar and vocabulary.', icon: <BookA size={32} />, color: '#f59e0b' },
  { id: 'Science', title: 'Science', desc: 'Explore the universe. From cells to the solar system.', icon: <FlaskConical size={32} />, color: '#6366f1' },
  { id: 'Verbal-Reasoning', title: 'Verbal Reasoning', desc: 'Solve word problems and decipher patterns.', icon: <Languages size={32} />, color: '#ec4899' },
  { id: 'Non-Verbal-Reasoning', title: 'Non-Verbal', desc: 'Identify shapes, sequences, and spatial rules.', icon: <Puzzle size={32} />, color: '#8b5cf6' },
  { id: 'Creative-Writing', title: 'Creative Writing', desc: 'Express your imagination through stories.', icon: <PenTool size={32} />, color: '#14b8a6' },
];

const LandingPage = ({ onOpenLogin }) => {
  const navigate = useNavigate();

  const handleSubjectClick = (subjectId) => {
    navigate(`/guest/subject/${subjectId}`);
  };

  return (
    <div className="landing-page">
      {/* Main Navbar */}
      <nav className="w3-navbar">
        <div className="nav-left">
          <div className="logo" onClick={() => navigate('/')}>
            <Sparkles className="logo-icon" /> FunLearn
          </div>
          <div className="nav-links">
            <a href="#library">Library</a>
            <a href="#exercises">Exercises</a>
            <a href="#certificates">Certificates</a>
            <a href="#services">Services</a>
          </div>
        </div>
        <div className="nav-right">
          <ThemeToggle />
          <Button variant="ghost" onClick={onOpenLogin} className="login-nav-btn">
            Log in
          </Button>
          <Button variant="primary" onClick={onOpenLogin} className="signup-nav-btn">
            Sign Up
          </Button>
        </div>
      </nav>

      {/* Sub Navbar (W3Schools Style) */}
      <div className="w3-subnav">
        {SUBJECTS.map(sub => (
          <button key={sub.id} onClick={() => handleSubjectClick(sub.id)}>
            {sub.title.toUpperCase()}
          </button>
        ))}
      </div>

      {/* Hero Section */}
      <header className="hero-section">
        <div className="hero-content">
          <h1>Learn to Master 11+</h1>
          <p>With the world's most interactive learning platform.</p>
          
          <div className="hero-search">
            <input type="text" placeholder="Search our subjects, e.g. Fractions" />
            <button className="search-btn"><Search size={20} /></button>
          </div>
          
          <a href="#" className="hero-link" onClick={(e) => { e.preventDefault(); onOpenLogin(); }}>
            Not Sure Where To Begin?
          </a>
        </div>
      </header>

      {/* Subject Grid Section */}
      <section className="subject-grid-section">
        <div className="grid-container">
          {SUBJECTS.map(subject => (
            <div 
              key={subject.id} 
              className="grid-subject-card"
              onClick={() => handleSubjectClick(subject.id)}
            >
              <div className="card-icon" style={{ color: subject.color }}>
                {subject.icon}
              </div>
              <h3>{subject.title}</h3>
              <p>{subject.desc}</p>
              <Button variant="outline" className="learn-more-btn">
                Learn {subject.title}
              </Button>
            </div>
          ))}
        </div>
      </section>

      {/* Footer CTA */}
      <footer className="landing-footer">
        <h2>Unlock Your Full Potential</h2>
        <Button variant="primary" size="lg" onClick={onOpenLogin} style={{ padding: '1rem 3rem', fontSize: '1.2rem', borderRadius: '50px' }}>
          Start Learning Now
        </Button>
      </footer>
    </div>
  );
};

export default LandingPage;
