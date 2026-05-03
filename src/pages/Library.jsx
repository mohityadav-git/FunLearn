import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, BookOpen, ChevronRight, FileText } from 'lucide-react';
import Button from '../components/Button';
import './Library.css';

const Library = ({ libraryByClass, currentUser }) => {
  const { subjectName } = useParams();
  const navigate = useNavigate();
  
  const classLevel = currentUser?.classLevel || "Class 1";
  const currentLibrary = libraryByClass[classLevel] || {};
  const content = currentLibrary[subjectName] || [];

  return (
    <div className="library-container animate-slide-up">
      <header className="library-header">
        <Button variant="ghost" onClick={() => navigate(`/student/subject/${subjectName}`)}>
          <ArrowLeft size={18} /> Back to Hub
        </Button>
        <div className="library-title-section">
          <h1>{subjectName} Library 📚</h1>
          <p>The ultimate repository of lesson summaries and cheat sheets.</p>
        </div>
      </header>

      <div className="library-grid">
        {content.length > 0 ? (
          content.map((topic) => (
            <div key={topic.id} className="topic-card card-panel">
              <div className="topic-icon">{topic.icon}</div>
              <div className="topic-details">
                <h3>{topic.title}</h3>
                <div className="module-list">
                  {topic.modules.map((mod, i) => (
                    <div key={i} className="module-item">
                      <FileText size={14} />
                      <span>{mod}</span>
                    </div>
                  ))}
                </div>
              </div>
              <Button variant="outline" className="read-btn" onClick={() => navigate(`/student/subject/${subjectName}/read/${topic.id}`)}>
                Read Now <ChevronRight size={16} />
              </Button>
            </div>
          ))
        ) : (
          <div className="empty-state card-panel">
            <p>No study materials found for {subjectName} yet. Check back soon!</p>
          </div>
        )}
      </div>

      <section className="featured-article card-panel">
        <div className="featured-badge">FEATURED</div>
        <div className="featured-content">
          <h2>Ultimate 11+ Exam Strategy</h2>
          <p>Learn how to manage your time and tackle the hardest questions with our expert guide.</p>
          <Button variant="primary" onClick={() => alert("Opening Ultimate 11+ Exam Strategy...")}>Read Article</Button>
        </div>
      </section>
    </div>
  );
};

export default Library;
