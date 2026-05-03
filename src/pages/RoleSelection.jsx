import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { GraduationCap, BookOpen, ArrowLeft } from 'lucide-react';
import Button from '../components/Button';
import './RoleSelection.css';

const RoleSelection = ({ onLogin }) => {
  const navigate = useNavigate();
  const [showStudentForm, setShowStudentForm] = useState(false);
  const [studentName, setStudentName] = useState("");
  const [selectedClass, setSelectedClass] = useState("Class 1");

  const handleTeacherLogin = () => {
    onLogin({ role: 'teacher' });
    navigate('/teacher');
  };

  const handleStudentLogin = (e) => {
    e.preventDefault();
    if (!studentName.trim()) {
      alert("Please enter your name!");
      return;
    }
    onLogin({ role: 'student', name: studentName, classLevel: selectedClass });
    navigate('/student');
  };

  if (showStudentForm) {
    return (
      <div className="role-container animate-pop-in">
        <div className="role-header" style={{ marginBottom: '2rem' }}>
          <h1>Student Login 🎒</h1>
          <p>Get ready for a fun learning adventure!</p>
        </div>
        
        <form className="glass-panel" style={{ padding: '2rem', maxWidth: '400px', width: '100%', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '1.5rem' }} onSubmit={handleStudentLogin}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', textAlign: 'left' }}>
            <label style={{ fontWeight: 'bold', color: 'var(--text-muted)' }}>Your Name</label>
            <input 
              type="text" 
              value={studentName}
              onChange={(e) => setStudentName(e.target.value)}
              placeholder="e.g. Alex"
              style={{ padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--border-color)', fontSize: '1rem' }}
              autoFocus
            />
          </div>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', textAlign: 'left' }}>
            <label style={{ fontWeight: 'bold', color: 'var(--text-muted)' }}>Select Class</label>
            <select 
              value={selectedClass}
              onChange={(e) => setSelectedClass(e.target.value)}
              style={{ padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--border-color)', fontSize: '1rem' }}
            >
              <option value="Class 1">Class 1</option>
              <option value="Class 2">Class 2</option>
              <option value="Class 3">Class 3</option>
              <option value="Class 4">Class 4</option>
              <option value="Class 5">Class 5</option>
            </select>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '1rem' }}>
            <Button type="submit" variant="primary">Start Learning ✨</Button>
            <Button type="button" variant="ghost" onClick={() => setShowStudentForm(false)}>
              <ArrowLeft size={16} /> Back
            </Button>
          </div>
        </form>
      </div>
    );
  }

  return (
    <div className="role-container animate-pop-in">
      <div className="role-header">
        <h1>Welcome to FunLearn! ✨</h1>
        <p>Who is playing today?</p>
      </div>

      <div className="role-grid">
        <button className="role-card card-panel" onClick={() => setShowStudentForm(true)}>
          <div className="role-icon-wrapper" style={{ backgroundColor: 'var(--primary-light)', color: 'var(--primary)' }}>
            <GraduationCap size={48} />
          </div>
          <h2>I am a Student</h2>
          <p>Login to your class to take exams, earn stars, and level up!</p>
        </button>

        <button className="role-card card-panel" onClick={handleTeacherLogin}>
          <div className="role-icon-wrapper" style={{ backgroundColor: 'var(--secondary-light)', color: 'var(--secondary)' }}>
            <BookOpen size={48} />
          </div>
          <h2>I am a Teacher</h2>
          <p>Create visual exams and manage study material by class.</p>
        </button>
      </div>
    </div>
  );
};

export default RoleSelection;
