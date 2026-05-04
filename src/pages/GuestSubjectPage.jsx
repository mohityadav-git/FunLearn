import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Sparkles, Menu, X } from 'lucide-react';
import Button from '../components/Button';
import ThemeToggle from '../components/ThemeToggle';
import GuestQuizCard from '../components/GuestQuizCard';
import './GuestSubjectPage.css';
import './LessonReader.css'; // Reuse W3Schools layout styles

const SUBJECTS = [
  { id: 'Mathematics', title: 'Mathematics' },
  { id: 'English', title: 'English' },
  { id: 'Science', title: 'Science' },
  { id: 'Verbal-Reasoning', title: 'Verbal Reasoning' },
  { id: 'Non-Verbal-Reasoning', title: 'Non-Verbal' },
  { id: 'Creative-Writing', title: 'Creative Writing' }
];

const SUBJECT_CONTENT = {
  'Mathematics': {
    title: 'Mathematics',
    desc: 'The language of numbers. Master arithmetic, geometry, and problem solving.',
    topics: ['Math Home', 'Math Intro', 'Math Numbers', 'Math Addition', 'Math Subtraction', 'Math Multiplication', 'Math Division', 'Math Geometry', 'Math Fractions'],
    quizTitle: 'Math Practice',
    question: 'If a train travels 60 miles in 1.5 hours, what is its average speed?',
    options: ['30 mph', '40 mph', '45 mph', '50 mph'],
    correct: 1
  },
  'English': {
    title: 'English',
    desc: 'The language of expression. Master grammar, vocabulary, and comprehension.',
    topics: ['English Home', 'English Intro', 'English Grammar', 'English Vocabulary', 'English Comprehension', 'English Adjectives', 'English Verbs'],
    quizTitle: 'English Practice',
    question: 'Identify the adjective in the sentence: "The quick brown fox jumps."',
    options: ['fox', 'jumps', 'quick', 'The'],
    correct: 2
  },
  'Science': {
    title: 'Science',
    desc: 'Explore the universe. From microscopic cells to the solar system.',
    topics: ['Science Home', 'Science Intro', 'Science Biology', 'Science Chemistry', 'Science Physics', 'Science Plants', 'Science Space'],
    quizTitle: 'Science Lab',
    question: 'What process do plants use to convert light energy into food?',
    options: ['Respiration', 'Photosynthesis', 'Digestion', 'Evaporation'],
    correct: 1
  }
};

const GuestSubjectPage = ({ onOpenLogin }) => {
  const { subjectName } = useParams();
  const navigate = useNavigate();
  const content = SUBJECT_CONTENT[subjectName] || SUBJECT_CONTENT['Mathematics']; // Fallback
  const [activeTopic, setActiveTopic] = useState(content.topics[0]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  
  // Use sessionStorage to track guest solves across different subjects
  const [guestSolvedCount, setGuestSolvedCount] = useState(() => {
    return parseInt(sessionStorage.getItem('guestSolvedCount') || '0', 10);
  });

  const handleSolveAttempt = () => {
    if (guestSolvedCount >= 2) {
      onOpenLogin();
      return false; 
    }
    const newCount = guestSolvedCount + 1;
    setGuestSolvedCount(newCount);
    sessionStorage.setItem('guestSolvedCount', newCount.toString());
    
    if (newCount === 1) { // They've solved 2 (since it's 0-indexed before adding, actually if newCount is 2 we block them next time. Wait, if they just hit 2, we show login after 1.5s)
      setTimeout(() => {
        onOpenLogin();
      }, 1500);
    }
    return true;
  };

  return (
    <div className="guest-subject-page">
      {/* Top Navbar */}
      <nav className="w3-navbar w3-top-nav">
        <div className="nav-left">
          <div className="logo" onClick={() => navigate('/')}>
            <Sparkles className="logo-icon" /> FunLearn
          </div>
        </div>
        <div className="nav-right">
          <ThemeToggle />
          <Button variant="ghost" onClick={onOpenLogin} className="login-nav-btn">Log in</Button>
          <Button variant="primary" onClick={onOpenLogin} className="signup-nav-btn">Sign Up</Button>
        </div>
      </nav>

      {/* Sub Navbar (W3Schools Style) */}
      <div className="w3-subnav" style={{ position: 'fixed', top: '76px', width: '100%', zIndex: 90 }}>
        {SUBJECTS.map(sub => (
          <button 
            key={sub.id} 
            onClick={() => navigate(`/guest/subject/${sub.id}`)}
            style={{ backgroundColor: sub.id === subjectName ? '#04AA6D' : 'transparent' }}
          >
            {sub.title.toUpperCase()}
          </button>
        ))}
      </div>

      <div className="guest-subject-layout" style={{ marginTop: '130px' }}>
        {/* Mobile Overlay */}
        {isSidebarOpen && <div className="w3-sidebar-overlay" onClick={() => setIsSidebarOpen(false)}></div>}

        {/* Left Sidebar */}
        <aside className={`w3-sidebar ${isSidebarOpen ? 'open' : ''}`}>
          <button className="w3-mobile-close-btn" onClick={() => setIsSidebarOpen(false)}>
            <X size={24} />
          </button>
          <div className="w3-sidebar-header" style={{ padding: '1rem' }}>
            <h2 style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--text-dark)', marginBottom: '0.5rem' }}>{content.title} Library</h2>
          </div>
          <div className="w3-menu-list">
            {content.topics.map((topic, i) => (
              <button 
                key={i}
                className={`w3-menu-item ${activeTopic === topic ? 'active' : ''}`}
                onClick={() => {
                  setActiveTopic(topic);
                  setIsSidebarOpen(false);
                }}
              >
                {topic}
              </button>
            ))}
          </div>
        </aside>

        {/* Main Content Area */}
        <main className="w3-main-content">
          <div className="w3-content-wrapper">
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
              <button className="w3-mobile-menu-btn" onClick={() => setIsSidebarOpen(true)}>
                <Menu size={24} />
              </button>
              <h1 className="w3-chapter-title" style={{ fontSize: '2.5rem', fontWeight: 900 }}>{content.title} Library</h1>
            </div>
            
            <div className="w3-text-content">
              <p className="intro-lead">You are viewing: <strong>{activeTopic}</strong>. {content.desc}</p>
              <p style={{ fontSize: '1.2rem', color: 'var(--text-muted)' }}>Welcome to our comprehensive {content.title} library. Here you will learn the fundamental concepts and put them into practice.</p>
              
              <div className="w3-info-panel" style={{ backgroundColor: '#e7f5fe', borderLeft: '6px solid #2196F3', padding: '1rem', margin: '2rem 0' }}>
                <strong>Note:</strong> This is a free preview. To track your progress and access the full curriculum, please <a href="#" onClick={(e) => { e.preventDefault(); onOpenLogin(); }} style={{color: '#2196F3', fontWeight: 'bold'}}>Log In</a>.
              </div>

              <h2>Try it Yourself</h2>
              <p>Test your knowledge with our interactive example below:</p>
              
              <div className="interactive-preview-container">
                <GuestQuizCard 
                  title={content.quizTitle}
                  question={content.question}
                  options={content.options}
                  correctAnswerIndex={content.correct}
                  onSolveAttempt={handleSolveAttempt}
                />
              </div>

            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default GuestSubjectPage;
