import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { ArrowLeft, ChevronLeft, ChevronRight, CheckCircle, PlayCircle, Code } from 'lucide-react';
import Button from '../components/Button';
import Visualizer3D from '../components/Visualizer3D';
import './LessonReader.css';

const LessonReader = ({ lessonsByClass, currentUser, onReadComplete }) => {
  const { subjectName, topicId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [currentSlide, setCurrentSlide] = useState(0);
  const contentRef = useRef(null);

  const queryParams = new URLSearchParams(location.search);
  const readPart = queryParams.get('part'); // Foundation, Intermediate, Advanced

  const classLevel = currentUser?.classLevel || "Class 1";
  const fullLesson = lessonsByClass[classLevel]?.[topicId];

  // Scroll to top when changing slides
  useEffect(() => {
    if (contentRef.current) {
      contentRef.current.scrollTo(0, 0);
    }
  }, [currentSlide]);

  if (!fullLesson) {
    return (
      <div className="w3-lesson-container">
        <div className="w3-sidebar">
          <div className="w3-sidebar-header">
            <Button variant="ghost" onClick={() => navigate(`/student/subject/${subjectName}/library`)}>
              <ArrowLeft size={18} /> Back to Library
            </Button>
          </div>
        </div>
        <div className="w3-main-content">
          <h2>Oops! Content not found.</h2>
          <p>We couldn't find the lesson you're looking for.</p>
        </div>
      </div>
    );
  }

  // Split slides based on part
  let slides = fullLesson.slides;
  if (readPart) {
    const total = slides.length;
    const third = Math.ceil(total / 3);
    if (readPart === 'Foundation') slides = slides.slice(0, third);
    else if (readPart === 'Intermediate') slides = slides.slice(third, third * 2);
    else if (readPart === 'Advanced') slides = slides.slice(third * 2);
  }

  // Ensure we have at least one slide (fallback if array is empty after slice)
  if (slides.length === 0) slides = fullLesson.slides;

  const isLastSlide = currentSlide === slides.length - 1;

  const nextSlide = () => {
    if (!isLastSlide) {
      setCurrentSlide(prev => prev + 1);
    }
  };

  const prevSlide = () => {
    if (currentSlide > 0) {
      setCurrentSlide(prev => prev - 1);
    }
  };

  const finishReading = () => {
    if (readPart && onReadComplete) {
      onReadComplete(classLevel, subjectName, topicId, readPart, 'read');
      navigate(`/student/subject/${subjectName}/study-plan`);
    } else {
      navigate('/student/practice');
    }
  };

  const currentContent = slides[currentSlide];

  return (
    <div className="w3-lesson-container animate-fade-in">
      
      {/* LEFT SIDEBAR (W3Schools Style) */}
      <div className="w3-sidebar">
        <div className="w3-sidebar-header">
          <Button variant="ghost" onClick={() => navigate(readPart ? `/student/subject/${subjectName}/study-plan` : `/student/subject/${subjectName}/library`)}>
            <ArrowLeft size={18} /> Back
          </Button>
          <h2>{fullLesson.title} {readPart ? `(${readPart})` : 'Tutorial'}</h2>
        </div>
        <div className="w3-menu-list">
          {slides.map((slide, index) => (
            <button 
              key={index}
              className={`w3-menu-item ${currentSlide === index ? 'active' : ''}`}
              onClick={() => setCurrentSlide(index)}
            >
              {slide.title}
            </button>
          ))}
        </div>
      </div>

      {/* MAIN CONTENT AREA */}
      <div className="w3-main-content" ref={contentRef}>
        <div className="w3-content-wrapper animate-slide-up" key={currentSlide}>
          
          <h1 className="w3-chapter-title">{currentContent.title}</h1>
          
          <div className="w3-text-content">
            {currentContent.content.split('\n').map((line, i) => (
              <p key={i}>{line}</p>
            ))}
          </div>

          {/* Interactive Visualizer Block */}
          {currentContent.visualizer && (
            <div className="w3-visualizer-container">
              <div className="w3-visualizer-header">
                <PlayCircle size={18} color="var(--primary)" /> 
                Interactive Demonstration
              </div>
              <Visualizer3D type={currentContent.visualizer} />
            </div>
          )}

          {/* Try It Yourself Example Block */}
          {currentContent.example && (
            <div className="w3-try-it">
              <h3><Code size={20} /> Example</h3>
              <div className="w3-example-code">
                {currentContent.example}
              </div>
            </div>
          )}

          {/* Bottom Navigation */}
          <div className="w3-bottom-nav">
            <Button 
              variant="outline" 
              className="w3-nav-btn"
              onClick={prevSlide} 
              disabled={currentSlide === 0}
            >
              <ChevronLeft size={20} /> Previous
            </Button>
            
            {!isLastSlide ? (
              <Button 
                variant="primary" 
                className="w3-nav-btn"
                onClick={nextSlide}
                style={{ background: '#04AA6D' }} // W3Schools green
              >
                Next <ChevronRight size={20} />
              </Button>
            ) : (
              <Button 
                variant="primary" 
                className="w3-nav-btn"
                onClick={finishReading} 
                style={{ background: 'var(--success)' }}
              >
                {readPart ? 'Finish Reading' : 'Finish & Practice'} <CheckCircle size={20} style={{ marginLeft: '0.5rem' }} />
              </Button>
            )}
          </div>

        </div>
      </div>
      
    </div>
  );
};

export default LessonReader;
