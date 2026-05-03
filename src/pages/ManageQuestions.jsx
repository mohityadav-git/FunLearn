import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { PlusCircle, Trash2, ArrowLeft, Save, BookOpen } from 'lucide-react';
import Button from '../components/Button';
import QuestionEditor from '../components/QuestionEditor';
import './ManageQuestions.css';

const ManageQuestions = ({ exams, onUpdateQuestions, bank, onSyncBank }) => {
  const { examId } = useParams();
  const navigate = useNavigate();
  
  const exam = exams.find(e => e.id === examId);

  // Initialize with existing questions if they exist, or a blank one if empty
  const [questions, setQuestions] = useState([]);
  const [showBank, setShowBank] = useState(false);
  const [selectedBankIds, setSelectedBankIds] = useState(new Set());

  useEffect(() => {
    if (exam && exam.questions) {
      setQuestions(exam.questions);
    }
  }, [exam]);

  if (!exam) {
    return <div className="manage-q-container"><h2>Exam not found</h2></div>;
  }



  const removeQuestion = (id) => {
    setQuestions(questions.filter(q => q.id !== id));
  };



  const handleSaveQuestions = () => {
    const sanitizedQuestions = questions.map(q => ({
      ...q,
      options: q.options.filter(o => typeof o === 'string' ? o.trim() !== '' : (o.text.trim() !== '' || o.imageUrl !== null))
    }));
    
    onUpdateQuestions(examId, sanitizedQuestions);
    if (onSyncBank) {
      onSyncBank(sanitizedQuestions, exam.subject, exam.topic, exam.subtopic);
    }
    navigate('/teacher');
  };

  const handleImportSelected = () => {
    if (!bank) return;
    const imported = bank.filter(q => selectedBankIds.has(q.id)).map(q => ({
      ...q,
      id: Date.now() + Math.random() // important so React keys don't clash
    }));
    setQuestions([...questions, ...imported]);
    setShowBank(false);
    setSelectedBankIds(new Set());
  };

  const toggleBankSelection = (id) => {
    const newSet = new Set(selectedBankIds);
    if (newSet.has(id)) newSet.delete(id);
    else newSet.add(id);
    setSelectedBankIds(newSet);
  };

  return (
    <div className="manage-q-container animate-fade-in">
      <div className="mq-header">
        <Button variant="ghost" onClick={() => navigate('/teacher')}><ArrowLeft size={20} /> Back to Dashboard</Button>
        <div className="header-actions">
          <Button variant="primary" onClick={handleSaveQuestions}><Save size={20} /> Save Exam</Button>
        </div>
      </div>

      <div className="mq-info-card glass-panel" style={{ marginBottom: '2rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <span style={{ fontSize: '2.5rem' }}>{exam.icon}</span>
          <div>
            <h1 style={{ color: 'var(--text-dark)', margin: 0 }}>Managing Questions for: {exam.title}</h1>
            <p style={{ color: 'var(--text-muted)' }}>
              {exam.subject} {exam.topic && `• ${exam.topic}`} {exam.subtopic && `• ${exam.subtopic}`}
            </p>
          </div>
        </div>
      </div>

      {showBank && (
        <div className="bank-picker-panel glass-panel animate-slide-up" style={{ padding: '2rem', border: '2px solid var(--primary)', marginBottom: '2rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
            <h2 style={{ color: 'var(--primary)', margin: 0 }}>Select from Question Bank</h2>
            <Button variant="ghost" onClick={() => setShowBank(false)}>Cancel</Button>
          </div>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', maxHeight: '400px', overflowY: 'auto', paddingRight: '1rem' }}>
            {!bank || bank.filter(q => q.subject === exam.subject && q.topic === exam.topic && (!exam.subtopic || q.subtopic === exam.subtopic)).length === 0 ? (
               <p style={{ color: 'var(--text-muted)' }}>
                 No questions found in the bank matching this exact subject and topic/subtopic. Go to the Bank to create some!
               </p>
            ) : bank.filter(q => q.subject === exam.subject && q.topic === exam.topic && (!exam.subtopic || q.subtopic === exam.subtopic)).map(q => (
              <label key={q.id} className="pop-hover" style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '1rem', background: '#f8fafc', borderRadius: '8px', cursor: 'pointer', border: selectedBankIds.has(q.id) ? '2px solid var(--primary)' : '2px solid #e2e8f0', transition: 'all 0.2s' }}>
                <input 
                  type="checkbox" 
                  checked={selectedBankIds.has(q.id) || questions.some(sel => sel.id === q.id)} 
                  disabled={questions.some(sel => sel.id === q.id)}
                  onChange={() => toggleBankSelection(q.id)} 
                  style={{ width: '22px', height: '22px', accentColor: 'var(--primary)', cursor: questions.some(sel => sel.id === q.id) ? 'not-allowed' : 'pointer' }}
                />
                <div style={{ flex: 1, opacity: questions.some(sel => sel.id === q.id) ? 0.5 : 1 }}>
                  <h4 style={{ margin: 0, fontSize: '1.125rem', color: 'var(--text-dark)' }}>{questions.some(sel => sel.id === q.id) ? "(Already Selected) " : ""}{q.text}</h4>
                  <span style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>
                    {q.topic} {q.subtopic && `• ${q.subtopic}`}
                  </span>
                </div>
              </label>
            ))}
          </div>

          <div style={{ marginTop: '2rem', display: 'flex', justifyContent: 'flex-end' }}>
            <Button variant="primary" onClick={handleImportSelected} disabled={selectedBankIds.size === 0}>
              Import {selectedBankIds.size} Questions
            </Button>
          </div>
        </div>
      )}

      <div className="questions-section">
        {questions.length === 0 ? (
          <div className="glass-panel" style={{ padding: '3rem', textAlign: 'center' }}>
            <h3 style={{ color: 'var(--text-muted)' }}>No questions added yet.</h3>
          </div>
        ) : null}

        {questions.map((q, qIndex) => (
          <div key={q.id} className="exam-list-item glass-panel animate-pop-in" style={{ alignItems: 'flex-start', position: 'relative' }}>
            <div 
              className="exam-list-icon"
              style={{ backgroundColor: `rgba(99, 102, 241, 0.1)`, color: 'var(--primary)', flexShrink: 0 }}
            >
              <BookOpen size={24} />
            </div>
            
            <div className="exam-list-details" style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem', width: '100%' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span className="exam-subject" style={{ color: 'var(--primary)' }}>
                  {q.subject} {q.topic && `• ${q.topic}`} {q.subtopic && `• ${q.subtopic}`}
                </span>
                <Button variant="ghost" size="sm" onClick={() => removeQuestion(q.id)}>
                  <Trash2 size={16} color="var(--danger)" />
                </Button>
              </div>
              
              <h3 style={{ fontSize: '1.125rem', marginTop: '0.25rem', marginBottom: '0.5rem' }}>{qIndex + 1}. {q.text}</h3>
              <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                {q.options.map((opt, i) => {
                  const text = typeof opt === 'string' ? opt : opt.text;
                  const isCorrect = i === q.correctAnswer;
                  return (
                    <div key={i} style={{ padding: '0.25rem 0.75rem', borderRadius: '4px', background: isCorrect ? 'rgba(34, 197, 94, 0.1)' : '#f1f5f9', color: isCorrect ? 'var(--success)' : 'var(--text-muted)', border: isCorrect ? '1px solid var(--success)' : '1px solid transparent', fontSize: '0.875rem', fontWeight: isCorrect ? 'bold' : 'normal' }}>
                      {text || "(Image Option)"}
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        ))}

        <div className="add-question-wrapper" style={{ display: 'flex', gap: '1rem' }}>
          <Button variant="primary" size="lg" onClick={() => setShowBank(true)} style={{ flex: 1 }}>
            <BookOpen size={20} /> Select Questions from Bank
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ManageQuestions;
