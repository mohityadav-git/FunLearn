import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Star, Zap, PlayCircle, Calculator, BookA, Brain, Shapes, Trophy, CheckCircle2, ChevronRight, Search } from 'lucide-react';
import Button from '../components/Button';
import './StudentDashboard.css';

const StudentDashboard = ({ stars, solvedQuestions, bank, libraryByClass, currentUser }) => {
  const navigate = useNavigate();

  const classLevel = currentUser?.classLevel || "Class 1";
  const currentLibrary = libraryByClass[classLevel] || {};
  const subjectNames = Object.keys(currentLibrary);

  const subjects = subjectNames.map(name => ({
    title: name,
    icon: <Calculator size={32} />, // Default icon, could be mapped based on name
    color: '#3b82f6', 
    bg: '#dbeafe'
  }));

  return (
    <div className="student-dashboard animate-slide-up">
      <section className="welcome-banner card-panel">
        <div className="welcome-content">
          <h1>Welcome back, Alex! 👋</h1>
          <p>Ready to conquer some new quests today?</p>
          <div className="quick-actions">
            <Button variant="primary" onClick={() => navigate('/student/practice')}>Resume Practice</Button>
            <Button variant="outline" style={{ color: 'white', borderColor: 'rgba(255,255,255,0.3)' }}>View History</Button>
          </div>
        </div>
      </section>

      <div className="dashboard-main-grid">
        <section className="dashboard-left">
          <div className="section-header">
            <h2>Your Subject Hubs</h2>
            <p>Select a subject to access Library, Study Plans, and Mocks.</p>
          </div>
          <div className="subjects-grid">
            {subjects.map(sub => (
              <div 
                key={sub.title} 
                className="subject-card card-panel"
                onClick={() => navigate(`/student/subject/${sub.title}`)}
                style={{ '--sub-color': sub.color }}
              >
                <div className="subject-icon" style={{ backgroundColor: sub.bg, color: sub.color }}>
                  {sub.icon}
                </div>
                <h3>{sub.title}</h3>
              </div>
            ))}
          </div>
        </section>

        <section className="dashboard-right">
          <div className="section-header">
            <h2>Progress Overview</h2>
          </div>
          <div className="progress-summary-card card-panel">
            <div className="summary-item">
              <div className="summary-icon stars"><Star fill="var(--warning)" color="var(--warning)" /></div>
              <div className="summary-text">
                <span className="summary-value">{stars}</span>
                <span className="summary-label">Stars Earned</span>
              </div>
            </div>
            <div className="summary-item">
              <div className="summary-icon solve"><Zap fill="var(--primary)" color="var(--primary)" /></div>
              <div className="summary-text">
                <span className="summary-value">{solvedQuestions.length}</span>
                <span className="summary-label">Quests Solved</span>
              </div>
            </div>
            <div className="summary-item">
              <div className="summary-icon trophy"><Trophy fill="#8b5cf6" color="#8b5cf6" /></div>
              <div className="summary-text">
                <span className="summary-value">4</span>
                <span className="summary-label">Weekly Streak</span>
              </div>
            </div>
            <div className="total-completion">
              <div className="completion-text">
                <span>Total Completion</span>
                <span>{Math.round((solvedQuestions.length / bank.length) * 100) || 0}%</span>
              </div>
              <div className="progress-bar-bg">
                <div className="progress-bar-fill" style={{ width: `${(solvedQuestions.length / bank.length) * 100}%` }}></div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default StudentDashboard;
