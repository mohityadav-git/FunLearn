import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, BookOpen, Search, PlusCircle, Pencil, Save, X } from 'lucide-react';
import Button from '../components/Button';
import QuestionEditor from '../components/QuestionEditor';
import './TeacherDashboard.css';



const generateDefaultOptions = () => [
  { text: '', imageUrl: null },
  { text: '', imageUrl: null },
  { text: '', imageUrl: null },
  { text: '', imageUrl: null }
];

const generateEmptyQuestion = () => ({
  id: Date.now() + Math.random(),
  text: '',
  imageUrl: null,
  options: generateDefaultOptions(),
  correctAnswer: 0,
  hint: '',
  classLevel: 'Class 1',
  subject: '',
  topic: '',
  subtopic: '',
  difficulty: 'Easy'
});

const QuestionBank = ({ bank, onUpdateBank, libraryByClass }) => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [editingQuestion, setEditingQuestion] = useState(null);

  const filteredBank = bank.filter(q => 
    q.text.toLowerCase().includes(searchTerm.toLowerCase()) || 
    q.subject.toLowerCase().includes(searchTerm.toLowerCase()) || 
    (q.topic && q.topic.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (q.subtopic && q.subtopic.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const startCreate = () => {
    setEditingQuestion(generateEmptyQuestion());
  };

  const startEdit = (q) => {
    // Ensure backwards compat if options are missing/strings
    let safeOptions = [...q.options];
    while (safeOptions.length < 4) {
      safeOptions.push({ text: '', imageUrl: null });
    }
    setEditingQuestion({ ...q, options: safeOptions });
  };

  const saveEdit = () => {
    if (!editingQuestion.text.trim()) {
      alert("Please provide the question text.");
      return;
    }
    const sanitized = {
      ...editingQuestion,
      options: editingQuestion.options.filter(o => typeof o === 'string' ? o.trim() !== '' : (o.text.trim() !== '' || o.imageUrl !== null))
    };
    
    let newBank = [...bank];
    const existingIndex = newBank.findIndex(bq => bq.id === editingQuestion.id);
    if (existingIndex >= 0) {
      newBank[existingIndex] = sanitized;
    } else {
      newBank.push(sanitized);
    }
    onUpdateBank(newBank);
    setEditingQuestion(null);
  };

  const cancelEdit = () => {
    setEditingQuestion(null);
  };

  if (editingQuestion) {
    return (
      <div className="teacher-dashboard animate-slide-up" style={{ maxWidth: '800px', margin: '0 auto' }}>
        <header className="dashboard-header" style={{ flexDirection: 'column', alignItems: 'flex-start', gap: '1.5rem', marginBottom: '2rem' }}>
          <Button variant="ghost" onClick={cancelEdit}><ArrowLeft size={20} /> Back to Bank</Button>
          <div className="welcome-text" style={{ display: 'flex', justifyContent: 'space-between', width: '100%', alignItems: 'center' }}>
            <div>
              <h1>{bank.some(q => q.id === editingQuestion.id) ? "Edit Question" : "Create New Question"} ✏️</h1>
              <p>Add a new independent question to the global pool.</p>
            </div>
            <Button variant="primary" onClick={saveEdit}><Save size={20} /> Save to Bank</Button>
          </div>
        </header>

        <div className="glass-panel" style={{ padding: '2rem', marginBottom: '2rem', borderRadius: '1rem' }}>
          <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
            <div className="form-group" style={{ flex: '1 1 150px', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <label style={{ fontSize: '0.875rem', fontWeight: 'bold', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Class</label>
              <select 
                value={editingQuestion.classLevel || 'Class 1'} 
                onChange={(e) => setEditingQuestion({...editingQuestion, classLevel: e.target.value, subject: '', topic: '', subtopic: ''})} 
                style={{ padding: '0.75rem', borderRadius: '8px', border: '1px solid #e2e8f0' }}
              >
                <option value="Class 1">Class 1</option>
                <option value="Class 2">Class 2</option>
                <option value="Class 3">Class 3</option>
                <option value="Class 4">Class 4</option>
                <option value="Class 5">Class 5</option>
              </select>
            </div>

            <div className="form-group" style={{ flex: '1 1 150px', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <label style={{ fontSize: '0.875rem', fontWeight: 'bold', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Subject</label>
              <select 
                value={editingQuestion.subject || ''} 
                onChange={(e) => setEditingQuestion({...editingQuestion, subject: e.target.value, topic: '', subtopic: ''})} 
                style={{ padding: '0.75rem', borderRadius: '8px', border: '1px solid #e2e8f0' }}
              >
                <option value="" disabled>Select Subject</option>
                {libraryByClass && libraryByClass[editingQuestion.classLevel || 'Class 1'] && Object.keys(libraryByClass[editingQuestion.classLevel || 'Class 1']).map((subj) => (
                  <option key={subj} value={subj}>{subj}</option>
                ))}
              </select>
            </div>

            <div className="form-group" style={{ flex: '1 1 150px', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <label style={{ fontSize: '0.875rem', fontWeight: 'bold', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Topic</label>
              <select 
                value={editingQuestion.topic || ''} 
                onChange={(e) => setEditingQuestion({...editingQuestion, topic: e.target.value, subtopic: ''})} 
                style={{ padding: '0.75rem', borderRadius: '8px', border: '1px solid #e2e8f0' }}
                disabled={!editingQuestion.subject}
              >
                <option value="" disabled>Select Topic</option>
                {editingQuestion.subject && libraryByClass && libraryByClass[editingQuestion.classLevel || 'Class 1'] && libraryByClass[editingQuestion.classLevel || 'Class 1'][editingQuestion.subject] && 
                  libraryByClass[editingQuestion.classLevel || 'Class 1'][editingQuestion.subject].map((t) => (
                  <option key={t.id} value={t.title}>{t.title}</option>
                ))}
              </select>
            </div>
            
            <div className="form-group" style={{ flex: '1 1 150px', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <label style={{ fontSize: '0.875rem', fontWeight: 'bold', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Sub Topic (Optional)</label>
              <input 
                value={editingQuestion.subtopic || ''} 
                onChange={(e) => setEditingQuestion({...editingQuestion, subtopic: e.target.value})} 
                placeholder="E.g. Advanced concepts" 
                style={{ padding: '0.75rem', borderRadius: '8px', border: '1px solid #e2e8f0', outline: 'none' }}
              />
            </div>

            <div className="form-group" style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '0.5rem', minWidth: 0, maxWidth: '150px' }}>
              <label style={{ fontSize: '0.875rem', fontWeight: 'bold', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Difficulty</label>
              <select 
                value={editingQuestion.difficulty || 'Easy'} 
                onChange={(e) => setEditingQuestion({...editingQuestion, difficulty: e.target.value})} 
                style={{ padding: '0.75rem 1rem', borderRadius: '8px', border: '1px solid #e2e8f0', appearance: 'auto', background: '#fff', width: '100%', boxSizing: 'border-box' }}
              >
                <option value="Easy">Easy</option>
                <option value="Medium">Medium</option>
                <option value="Hard">Hard</option>
              </select>
            </div>
          </div>
        </div>

        <QuestionEditor 
          question={editingQuestion}
          onUpdate={setEditingQuestion}
          hideHeader={true}
        />
      </div>
    );
  }

  return (
    <div className="teacher-dashboard animate-slide-up">
      <header className="dashboard-header" style={{ flexDirection: 'column', alignItems: 'flex-start', gap: '1.5rem' }}>
        <Button variant="ghost" onClick={() => navigate('/teacher')}><ArrowLeft size={20} /> Back to Dashboard</Button>
        <div className="welcome-text" style={{ display: 'flex', justifyContent: 'space-between', width: '100%', alignItems: 'center' }}>
          <div>
            <h1>Global Question Bank 📚</h1>
            <p>Browse and search all questions created across your entire school network.</p>
          </div>
          <Button variant="primary" onClick={startCreate}>
            <PlusCircle size={20} /> Create New Question
          </Button>
        </div>
      </header>

      <div className="exams-section">
        <div className="glass-panel" style={{ padding: '1rem', display: 'flex', gap: '1rem', alignItems: 'center', marginBottom: '2rem' }}>
          <Search size={20} color="var(--text-muted)" />
          <input 
            type="text" 
            placeholder="Search by question text, subject, or topic..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ border: 'none', background: 'transparent', flex: 1, outline: 'none', fontSize: '1rem' }}
          />
        </div>

        {filteredBank.length === 0 ? (
          <div className="glass-panel text-center" style={{ padding: '3rem', borderRadius: 'var(--radius-lg)' }}>
            <h2 style={{ color: 'var(--text-muted)' }}>No questions found</h2>
            <p>Try adjusting your search or build new questions to add them here.</p>
          </div>
        ) : (
          <div className="exams-list">
            {filteredBank.map((q) => (
              <div key={q.id} className="exam-list-item glass-panel" style={{ alignItems: 'flex-start', position: 'relative' }}>
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
                    <Button variant="outline" size="sm" onClick={() => startEdit(q)}>
                      <Pencil size={14} /> Edit
                    </Button>
                  </div>
                  
                  <h3 style={{ fontSize: '1.125rem', marginTop: '0.25rem', marginBottom: '0.5rem' }}>{q.text}</h3>
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
          </div>
        )}
      </div>
    </div>
  );
};

export default QuestionBank;
