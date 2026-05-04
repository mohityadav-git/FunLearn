import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Calculator, BookA, Brain, Shapes, CheckCircle2, ChevronRight, Search, Trophy, Tags } from 'lucide-react';
import Button from '../components/Button';
import { stripFormatting } from '../utils/textFormatter';
import './Practice.css';

const Practice = ({ bank, solvedQuestions }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedSubject, setSelectedSubject] = useState('Mathematics');
  const [selectedTopic, setSelectedTopic] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  // Reset topic when subject changes
  useEffect(() => {
    setSelectedTopic('All');
  }, [selectedSubject]);

  const subjects = [
    { title: 'Mathematics', icon: <Calculator size={20} />, color: '#3b82f6', bg: '#dbeafe' }
  ];

  // Extract unique topics for the selected subject
  const availableTopics = useMemo(() => {
    const topics = new Set();
    bank.forEach(q => {
      if (q.subject === selectedSubject && q.topic) {
        topics.add(q.topic);
      }
    });
    return ['All', ...Array.from(topics)];
  }, [bank, selectedSubject]);

  const filteredProblems = bank.filter(q => {
    const matchesSubject = q.subject === selectedSubject;
    const matchesTopic = selectedTopic === 'All' || q.topic === selectedTopic;
    const matchesSearch = q.text.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSubject && matchesTopic && matchesSearch;
  });

  const getStatusIcon = (id) => {
    if (solvedQuestions.includes(id)) return <CheckCircle2 className="status-icon solved" size={18} />;
    return <div className="status-dot"></div>;
  };

  const getDifficultyClass = (diff) => {
    return `diff-tag ${diff.toLowerCase()}`;
  };

  const activeSubjectColor = subjects.find(s => s.title === selectedSubject)?.color || '#3b82f6';

  return (
    <div className="practice-arena animate-slide-up">
      <header className="practice-header">
        <div className="header-text">
          <h1>Practice Arena ⚔️</h1>
          <p>Master individual problems at your own pace.</p>
        </div>
        <div className="header-stats card-panel">
          <div className="stat">
            <span className="stat-label">Solved</span>
            <span className="stat-value">{solvedQuestions.length}</span>
          </div>
          <div className="stat-divider" />
          <div className="stat">
            <span className="stat-label">Available</span>
            <span className="stat-value">{bank.length}</span>
          </div>
        </div>
      </header>

      <section className="practice-filters-container">
        <div className="practice-filters card-panel">
          <div className="subject-tabs">
            {subjects.map(sub => (
              <button 
                key={sub.title}
                className={`subject-tab ${selectedSubject === sub.title ? 'active' : ''}`}
                onClick={() => setSelectedSubject(sub.title)}
                style={{ '--tab-color': sub.color }}
              >
                {sub.icon}
                <span>{sub.title}</span>
              </button>
            ))}
          </div>
          <div className="search-box card-panel">
            <Search size={18} />
            <input 
              type="text" 
              placeholder={`Search in ${selectedSubject}...`} 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        <div className="topic-filters-row card-panel">
          <div className="topic-label">
            <Tags size={16} />
            <span>Topics:</span>
          </div>
          <div className="topic-chips">
            {availableTopics.map(topic => (
              <button
                key={topic}
                className={`topic-chip ${selectedTopic === topic ? 'active' : ''}`}
                style={{ '--active-color': activeSubjectColor }}
                onClick={() => setSelectedTopic(topic)}
              >
                {topic}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="problem-table-container">
        <div className="problem-table-wrapper card-panel">
          <table className="problem-table">
            <thead>
              <tr>
                <th className="th-status">Status</th>
                <th className="th-title">Problem Description</th>
                <th className="th-topic">Topic</th>
                <th className="th-diff">Difficulty</th>
                <th className="th-action"></th>
              </tr>
            </thead>
            <tbody>
              {filteredProblems.map((q) => (
                <tr key={q.id} className="problem-row" onClick={() => navigate(`/solve/${q.id}`)}>
                  <td className="td-status">{getStatusIcon(q.id)}</td>
                  <td className="td-title">
                    <span className="problem-link">{stripFormatting(q.text).substring(0, 80)}{stripFormatting(q.text).length > 80 ? '...' : ''}</span>
                  </td>
                  <td className="td-topic">
                    <span className="topic-badge">{q.topic || 'General'}</span>
                  </td>
                  <td className="td-diff">
                    <span className={getDifficultyClass(q.difficulty)}>{q.difficulty}</span>
                  </td>
                  <td className="td-action">
                    <ChevronRight size={18} className="chevron" />
                  </td>
                </tr>
              ))}
              {filteredProblems.length === 0 && (
                <tr>
                  <td colSpan="5" className="empty-table">
                     No {selectedTopic !== 'All' ? selectedTopic : ''} problems found for "{searchQuery}" in {selectedSubject}.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};

export default Practice;
