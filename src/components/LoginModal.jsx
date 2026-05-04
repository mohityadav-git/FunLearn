import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { useNavigate } from 'react-router-dom';
import { X, GraduationCap, BookOpen, ArrowLeft } from 'lucide-react';
import Button from './Button';
import './LoginModal.css';

const LoginModal = ({ isOpen, onClose, onLogin }) => {
  const navigate = useNavigate();
  const [role, setRole] = useState(null); // 'student' or 'teacher' or null
  const [studentName, setStudentName] = useState("");
  const [selectedClass, setSelectedClass] = useState("Class 1");

  if (!isOpen) return null;

  const handleTeacherLogin = () => {
    onLogin({ role: 'teacher' });
    onClose();
    navigate('/teacher');
  };

  const handleStudentLogin = (e) => {
    e.preventDefault();
    if (!studentName.trim()) {
      alert("Please enter your name!");
      return;
    }
    onLogin({ role: 'student', name: studentName, classLevel: selectedClass });
    onClose();
    navigate('/student');
  };

  const resetAndClose = () => {
    setRole(null);
    setStudentName("");
    setSelectedClass("Class 1");
    onClose();
  };

  return createPortal(
    <div className="login-modal-overlay" onClick={resetAndClose}>
      <div className="login-modal-content" onClick={e => e.stopPropagation()}>
        <button className="login-modal-close" onClick={resetAndClose}>
          <X size={24} />
        </button>

        {!role ? (
          <div className="role-selection-view animate-fade-in">
            <h2>Welcome to FunLearn!</h2>
            <p>Who is playing today?</p>
            
            <div className="role-options">
              <button className="role-btn student-btn" onClick={() => setRole('student')}>
                <div className="role-icon"><GraduationCap size={32} /></div>
                <h3>I am a Student</h3>
                <span>Login to earn stars and level up!</span>
              </button>

              <button className="role-btn teacher-btn" onClick={handleTeacherLogin}>
                <div className="role-icon"><BookOpen size={32} /></div>
                <h3>I am a Teacher</h3>
                <span>Create and manage study material.</span>
              </button>
            </div>
          </div>
        ) : (
          <div className="student-login-view animate-slide-up">
            <button className="back-btn" onClick={() => setRole(null)}>
              <ArrowLeft size={18} /> Back
            </button>
            <h2>Student Login 🎒</h2>
            
            <form className="student-login-form" onSubmit={handleStudentLogin}>
              <div className="form-group">
                <label>Your Name</label>
                <input 
                  type="text" 
                  value={studentName}
                  onChange={(e) => setStudentName(e.target.value)}
                  placeholder="e.g. Alex"
                  autoFocus
                />
              </div>
              
              <div className="form-group">
                <label>Select Class</label>
                <select 
                  value={selectedClass}
                  onChange={(e) => setSelectedClass(e.target.value)}
                >
                  <option value="Class 1">Class 1</option>
                  <option value="Class 2">Class 2</option>
                  <option value="Class 3">Class 3</option>
                  <option value="Class 4">Class 4</option>
                  <option value="Class 5">Class 5</option>
                </select>
              </div>

              <Button type="submit" variant="primary" style={{ width: '100%', marginTop: '1rem', padding: '1rem' }}>
                Start Learning ✨
              </Button>
            </form>
          </div>
        )}
      </div>
    </div>,
    document.body
  );
};

export default LoginModal;
