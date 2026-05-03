import React from 'react';
import { useNavigate } from 'react-router-dom';
import { PlusCircle, Settings, Users, BookOpen } from 'lucide-react';
import Button from '../components/Button';
import './TeacherDashboard.css';

const TeacherDashboard = ({ exams }) => {
  const navigate = useNavigate();

  return (
    <div className="teacher-dashboard animate-slide-up">
      <header className="dashboard-header">
        <div className="welcome-text">
          <h1>Teacher Portal 📚</h1>
          <p>Manage your curriculum and custom quests.</p>
        </div>
        
        <div className="stats-row">
          <div className="stat-card glass-panel">
            <BookOpen className="stat-icon" style={{ color: "var(--primary)" }} />
            <div className="stat-info">
              <span className="stat-value">{exams.length}</span>
              <span className="stat-label">Active Exams</span>
            </div>
          </div>
          <div className="stat-card glass-panel">
            <Users className="stat-icon" style={{ color: "var(--warning)" }} />
            <div className="stat-info">
              <span className="stat-value">24</span>
              <span className="stat-label">Students</span>
            </div>
          </div>
        </div>
      </header>

      <div className="exams-section">
        <div className="exams-header" style={{ justifyContent: 'space-between' }}>
          <h2>Your Created Exams</h2>
          <div style={{ display: 'flex', gap: '1rem' }}>
            <Button variant="outline" onClick={() => navigate('/teacher/lessons')}>
              <BookOpen size={20} /> Content Manager
            </Button>
            <Button variant="outline" onClick={() => navigate('/teacher/bank')}>
              <BookOpen size={20} /> Question Bank
            </Button>
            <Button variant="primary" onClick={() => navigate('/teacher/create')}>
              <PlusCircle size={20} /> Create New Exam
            </Button>
          </div>
        </div>

        {exams.length === 0 ? (
          <div className="glass-panel text-center" style={{ padding: '3rem', borderRadius: 'var(--radius-lg)' }}>
            <h2 style={{ color: 'var(--text-muted)' }}>No exams available</h2>
            <p>You haven't created any quests yet. Create one now!</p>
          </div>
        ) : (
          <div className="exams-list">
            {exams.map((exam) => (
              <div key={exam.id} className="exam-list-item glass-panel">
                <div 
                  className="exam-list-icon"
                  style={{ backgroundColor: `${exam.color}20`, color: exam.color }}
                >
                  <span className="exam-emoji">{exam.icon}</span>
                </div>
                
                <div className="exam-list-details">
                  <h3>{exam.title}</h3>
                  <span className="exam-subject">{exam.subject}</span>
                </div>
                
                <div className="exam-list-meta">
                  <div className="meta-pill">
                    <span className="meta-label">Questions:</span>
                    <span className="meta-value">{exam.questions.length}</span>
                  </div>
                  <div className="meta-pill">
                    <span className="meta-label">Reward:</span>
                    <span className="meta-value">{exam.reward}</span>
                  </div>
                </div>

                <div className="exam-list-actions">
                  <Button variant="ghost" onClick={() => navigate(`/teacher/exam/${exam.id}/questions`)}>
                    <Settings size={18} /> Manage Questions
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default TeacherDashboard;
