import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Zap, Target, Search, Sparkles } from 'lucide-react';
import Button from '../components/Button';
import './Explore.css';

const Explore = () => {
  const { subjectName } = useParams();
  const navigate = useNavigate();

  const categories = [
    { name: 'Topic Mix', icon: <Zap size={24} />, count: 12, color: '#f59e0b' },
    { name: 'Daily Target', icon: <Target size={24} />, count: 1, color: '#10b981' },
    { name: 'Speed Run', icon: <Sparkles size={24} />, count: 5, color: '#ef4844' }
  ];

  return (
    <div className="explore-container animate-slide-up">
      <header className="explore-header">
        <Button variant="ghost" onClick={() => navigate(`/student/subject/${subjectName}`)}>
          <ArrowLeft size={18} /> Back to Hub
        </Button>
        <div className="explore-title-section">
          <h1>Explore {subjectName} 🧭</h1>
          <p>Uncover new challenges and randomized practice sets.</p>
        </div>
      </header>

      <section className="featured-topic card-panel">
        <div className="topic-meta">TOPIC OF THE DAY</div>
        <div className="topic-main">
          <h2>Advanced Logic Puzzles</h2>
          <p>Master the art of deduction with our most challenging set of problems yet.</p>
          <div className="topic-actions">
            <Button variant="primary" size="lg" onClick={() => navigate(`/student?subject=${subjectName}`)}>Start Challenge</Button>
            <span className="reward-info">+100 Bonus Stars</span>
          </div>
        </div>
      </section>

      <div className="explore-grid">
        {categories.map((cat, i) => (
          <div key={i} className="explore-card card-panel" onClick={() => navigate(`/student?subject=${subjectName}`)}>
            <div className="explore-card-icon" style={{ backgroundColor: `${cat.color}15`, color: cat.color }}>
              {cat.icon}
            </div>
            <div className="explore-card-text">
              <h3>{cat.name}</h3>
              <p>{cat.count} Sets Available</p>
            </div>
          </div>
        ))}
      </div>

      <section className="search-deep-dive card-panel">
        <div className="search-info">
          <h3>Deep Dive by Topic</h3>
          <p>Looking for something specific? Jump straight into a curated topical set.</p>
        </div>
        <div className="search-bar-mock">
          <Search size={20} />
          <span>Type to search topics...</span>
        </div>
      </section>
    </div>
  );
};

export default Explore;
