import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Save } from 'lucide-react';
import Button from '../components/Button';
import './CreateExam.css';

const MATH_TOPICS = {
  "Numbers Up to 9999": [],
  "Addition": [],
  "Subtraction": [],
  "Multiplication": [],
  "Division": [],
  "Day, Date and Time": [],
  "Money": [],
  "Length": [],
  "Weight": [],
  "Capacity": [],
  "Fraction": [],
  "Geometry": []
};

const CreateExam = ({ onAddExam }) => {
  const navigate = useNavigate();
  
  const [examMeta, setExamMeta] = useState({
    title: '',
    subject: 'Maths',
    topic: '',
    subtopic: '',
    color: '#6366f1',
    icon: '📚',
    reward: 500
  });

  const handleMetaChange = (e) => {
    const { name, value } = e.target;
    if (name === 'subject') {
      setExamMeta({ ...examMeta, subject: value, topic: '', subtopic: '' });
    } else if (name === 'topic') {
      setExamMeta({ ...examMeta, topic: value, subtopic: '' });
    } else {
      setExamMeta({ ...examMeta, [name]: value });
    }
  };

  const handleSave = () => {
    const newExamId = `custom-${Date.now()}`;
    const newExam = {
      id: newExamId,
      ...examMeta,
      questions: []
    };
    onAddExam(newExam);
    navigate(`/teacher/exam/${newExamId}/questions`);
  };

  return (
    <div className="create-exam-container animate-fade-in">
      <div className="create-header">
        <Button variant="ghost" onClick={() => navigate('/teacher')}><ArrowLeft size={20} /> Back</Button>
      </div>

      <div className="form-section glass-panel">
        <h1 style={{ fontSize: '2rem', marginBottom: '0.25rem', color: 'var(--text-dark)' }}>Create New Exam</h1>
        <p className="instruction-text">Fill out the basic details for this exam. You will add questions on the next page.</p>
        
        <div className="form-grid" style={{ marginTop: '2rem' }}>
          <div className="form-group">
            <label>Exam Title</label>
            <input name="title" value={examMeta.title} onChange={handleMetaChange} placeholder="e.g. Safari Animals" />
          </div>
          <div className="form-row">
            <div className="form-group">
              <label>Subject</label>
              <select name="subject" value={examMeta.subject} onChange={handleMetaChange} className="styled-select">
                <option value="Maths">Maths</option>
              </select>
            </div>
            <div className="form-group">
              <label>Topic</label>
              {examMeta.subject === 'Maths' ? (
                <select name="topic" value={examMeta.topic} onChange={handleMetaChange} className="styled-select">
                  <option value="" disabled>Select a Math Topic</option>
                  {Object.keys(MATH_TOPICS).map((group) => (
                    <option key={group} value={group}>{group}</option>
                  ))}
                </select>
              ) : (
                <input name="topic" value={examMeta.topic} onChange={handleMetaChange} placeholder="e.g. Grammar Rules" />
              )}
            </div>
            
            {(examMeta.subject === 'Maths' && examMeta.topic) || examMeta.subject !== 'Maths' ? (
              <div className="form-group">
                <label>Sub Topic</label>
                {examMeta.subject === 'Maths' && examMeta.topic ? (
                  <select name="subtopic" value={examMeta.subtopic} onChange={handleMetaChange} className="styled-select">
                    <option value="" disabled>Select a Sub Topic</option>
                    {MATH_TOPICS[examMeta.topic]?.map(t => (
                      <option key={t} value={t}>{t}</option>
                    ))}
                  </select>
                ) : (
                  <input name="subtopic" value={examMeta.subtopic} onChange={handleMetaChange} placeholder="e.g. Adjectives" />
                )}
              </div>
            ) : null}
          </div>
          <div className="form-row">
            <div className="form-group">
              <label>Icon Emoji</label>
              <input name="icon" value={examMeta.icon} onChange={handleMetaChange} placeholder="🦁" maxLength="2" />
            </div>
            <div className="form-group">
              <label>Theme Color</label>
              <input type="color" name="color" value={examMeta.color} onChange={handleMetaChange} className="color-picker" />
            </div>
            <div className="form-group">
              <label>Total Reward Points</label>
              <input type="number" name="reward" value={examMeta.reward} onChange={handleMetaChange} />
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '2rem' }}>
          <Button variant="primary" size="lg" onClick={handleSave}>Continue to Question Builder <ArrowLeft size={20} style={{ transform: 'rotate(180deg)' }} /></Button>
        </div>
      </div>
    </div>
  );
};

export default CreateExam;
