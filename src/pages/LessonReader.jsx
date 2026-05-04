import React, { useEffect, useRef, useState } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { ArrowLeft, ChevronLeft, ChevronRight, PlayCircle, Code, Menu, X } from 'lucide-react';
import Button from '../components/Button';
import Visualizer3D from '../components/Visualizer3D';
import './LessonReader.css';

const LessonReader = ({ lessonsByClass, libraryByClass, currentUser, onReadComplete }) => {
  const { subjectName, topicId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const contentRef = useRef(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const queryParams = new URLSearchParams(location.search);
  const readPart = queryParams.get('part'); 

  const classLevel = currentUser?.classLevel || "Class 1";
  
  const currentLibrary = libraryByClass?.[classLevel] || {};
  const subjectTopics = currentLibrary[subjectName] || [];

  // If no topicId provided, default to the first one
  const activeTopicId = topicId || (subjectTopics.length > 0 ? subjectTopics[0].id : null);
  const activeTopicIndex = subjectTopics.findIndex(t => t.id === activeTopicId);
  const activeTopicDetails = subjectTopics[activeTopicIndex];

  const fullLesson = lessonsByClass?.[classLevel]?.[activeTopicId];

  useEffect(() => {
    if (contentRef.current) {
      contentRef.current.scrollTo(0, 0);
    }
  }, [activeTopicId]);

  if (!fullLesson || !activeTopicDetails) {
    return (
      <div className="w3-lesson-container">
        <div className={`w3-sidebar ${isSidebarOpen ? 'open' : ''}`}>
          <button className="w3-mobile-close-btn" onClick={() => setIsSidebarOpen(false)}>
            <X size={24} />
          </button>
          <div className="w3-sidebar-header">
            <Button variant="ghost" onClick={() => navigate(`/student/subject/${subjectName}`)}>
              <ArrowLeft size={18} /> Back to Hub
            </Button>
          </div>
        </div>
        <div className="w3-main-content">
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
            <button className="w3-mobile-menu-btn" onClick={() => setIsSidebarOpen(true)}>
              <Menu size={24} />
            </button>
            <h2>Oops! Content not found.</h2>
          </div>
          <p>We couldn't find the lesson you're looking for.</p>
        </div>
      </div>
    );
  }

  const handleNextTopic = () => {
    if (activeTopicIndex < subjectTopics.length - 1) {
      const nextTopic = subjectTopics[activeTopicIndex + 1];
      navigate(`/student/subject/${subjectName}/library/${nextTopic.id}`);
    } else {
      if (onReadComplete && readPart) {
        onReadComplete(classLevel, subjectName, activeTopicId, readPart, 'read');
      }
      navigate(`/student/subject/${subjectName}`);
    }
  };

  const handlePrevTopic = () => {
    if (activeTopicIndex > 0) {
      const prevTopic = subjectTopics[activeTopicIndex - 1];
      navigate(`/student/subject/${subjectName}/library/${prevTopic.id}`);
    }
  };

  return (
    <div className="w3-lesson-container animate-fade-in">
      {/* Mobile Overlay */}
      {isSidebarOpen && <div className="w3-sidebar-overlay" onClick={() => setIsSidebarOpen(false)}></div>}
      
      {/* Left Sidebar */}
      <div className={`w3-sidebar ${isSidebarOpen ? 'open' : ''}`}>
        <button className="w3-mobile-close-btn" onClick={() => setIsSidebarOpen(false)}>
          <X size={24} />
        </button>
        <div className="w3-sidebar-header">
          <Button variant="ghost" onClick={() => navigate(`/student/subject/${subjectName}`)}>
            <ArrowLeft size={18} /> Hub
          </Button>
          <h2>{subjectName} Library</h2>
        </div>
        <div className="w3-menu-list">
          {subjectTopics.map((topic) => (
            <button 
                key={topic.id}
                className={`w3-menu-item ${topic.id === activeTopicId ? 'active' : ''}`}
                onClick={() => {
                  navigate(`/student/subject/${subjectName}/library/${topic.id}`);
                  setIsSidebarOpen(false);
                }}
              >
              {topic.title}
            </button>
          ))}
        </div>
      </div>

      {/* Main Content Area */}
      <div className="w3-main-content" ref={contentRef}>
        <div className="w3-content-wrapper">
          
          {/* Top navigation actions */}
          <div className="w3-chapter-header" style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <button className="w3-mobile-menu-btn" onClick={() => setIsSidebarOpen(true)}>
              <Menu size={24} />
            </button>
            <h1 className="w3-chapter-title">{fullLesson.title}</h1>
          </div>

          <div className="w3-top-nav-buttons" style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2rem' }}>
            <Button 
              variant="outline" 
              className="w3-nav-btn"
              onClick={handlePrevTopic} 
              disabled={activeTopicIndex === 0}
            >
              <ChevronLeft size={20} /> Previous
            </Button>
            
            <Button 
              variant="primary" 
              className="w3-nav-btn"
              onClick={handleNextTopic}
              style={{ background: '#04AA6D' }}
            >
              {activeTopicIndex === subjectTopics.length - 1 ? 'Finish' : 'Next'} <ChevronRight size={20} />
            </Button>
          </div>

          <div className="w3-lesson-body">
            {fullLesson.slides.map((slide, index) => (
              <div key={index} className="w3-slide-section" style={{ marginBottom: '3rem' }}>
                <h2 style={{ fontSize: '1.8rem', color: 'var(--text-dark)', marginBottom: '1rem' }}>{slide.title}</h2>
                <div 
                  className="w3-text-content ql-editor-like-styles" 
                  style={{ fontSize: '1.15rem', lineHeight: '1.6', marginBottom: '1rem' }} 
                  dangerouslySetInnerHTML={{ __html: slide.content }} 
                />

                {slide.visualizer && (
                  <div className="w3-visualizer-container" style={{ margin: '1.5rem 0' }}>
                    <div className="w3-visualizer-header" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 'bold', padding: '1rem', backgroundColor: '#f1f5f9', borderRadius: '8px 8px 0 0' }}>
                      <PlayCircle size={18} color="var(--primary)" /> 
                      Interactive Demonstration
                    </div>
                    <Visualizer3D type={slide.visualizer} />
                  </div>
                )}

                {slide.example && (
                  <div className="w3-try-it" style={{ backgroundColor: '#E7E9EB', padding: '1.5rem', borderRadius: '8px', margin: '1.5rem 0' }}>
                    <h3 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: 0 }}><Code size={20} /> Example</h3>
                    <div 
                      className="w3-example-code" 
                      style={{ backgroundColor: '#fff', padding: '1.5rem', borderLeft: '4px solid #04AA6D', fontFamily: 'monospace', fontSize: '1.1rem', whiteSpace: 'pre-wrap' }} 
                      dangerouslySetInnerHTML={{ __html: slide.example }} 
                    />
                  </div>
                )}
                
                {index < fullLesson.slides.length - 1 && <hr className="w3-divider" style={{ border: 'none', borderTop: '1px solid #e2e8f0', margin: '3rem 0' }} />}
              </div>
            ))}
          </div>

          {/* Bottom Navigation */}
          <div className="w3-bottom-nav" style={{ display: 'flex', justifyContent: 'space-between', marginTop: '2rem', paddingTop: '2rem', borderTop: '1px solid #e2e8f0' }}>
            <Button 
              variant="outline" 
              className="w3-nav-btn"
              onClick={handlePrevTopic} 
              disabled={activeTopicIndex === 0}
            >
              <ChevronLeft size={20} /> Previous
            </Button>
            
            <Button 
              variant="primary" 
              className="w3-nav-btn"
              onClick={handleNextTopic}
              style={{ background: '#04AA6D' }}
            >
              {activeTopicIndex === subjectTopics.length - 1 ? 'Finish Library' : 'Next Topic'} <ChevronRight size={20} />
            </Button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default LessonReader;
