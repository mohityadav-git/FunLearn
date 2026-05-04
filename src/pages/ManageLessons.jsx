import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, PlusCircle, Save, Pencil, Trash2, Search } from 'lucide-react';
import Button from '../components/Button';
import { DefaultEditor } from 'react-simple-wysiwyg';
import { stripFormatting } from '../utils/textFormatter';
import './ManageLessons.css';

const VISUALIZERS = [
  { id: "", label: "None" },
  { id: "counting", label: "Counting Spheres" },
  { id: "subtraction", label: "Falling Blocks" },
  { id: "multiplication", label: "Multiplication Grid" },
  { id: "division", label: "Splitting Groups" },
  { id: "time", label: "Interactive Clock" },
  { id: "money", label: "Flipping Coins" },
  { id: "length", label: "Ruler & Blocks" },
  { id: "weight", label: "Balance Scale" },
  { id: "capacity", label: "Filling Jug" },
  { id: "fractions", label: "Splitting Pie" },
  { id: "geometry", label: "3D Shapes" }
];

const ManageLessons = ({ lessonsByClass, onUpdateLessons, libraryByClass, onUpdateLibrary }) => {
  const navigate = useNavigate();
  const [selectedClass, setSelectedClass] = useState("Class 1");
  const [subjectInput, setSubjectInput] = useState("");
  const [topicInput, setTopicInput] = useState("");
  const [activeTopicId, setActiveTopicId] = useState(null);
  const [activeTopicTitle, setActiveTopicTitle] = useState("");

  const [editingIndex, setEditingIndex] = useState(null);
  const [editForm, setEditForm] = useState(null);

  const currentLessons = lessonsByClass[selectedClass] || {};
  const topicData = activeTopicId ? (currentLessons[activeTopicId] || { title: activeTopicTitle, slides: [] }) : null;

  const handleLoadCreateTopic = () => {
    if (!subjectInput.trim() || !topicInput.trim()) {
      alert("Please enter both Subject and Topic names.");
      return;
    }

    const currentLibrary = { ...libraryByClass[selectedClass] } || {};
    
    // Check if subject exists
    if (!currentLibrary[subjectInput]) {
      currentLibrary[subjectInput] = [];
    }

    // Check if topic exists in this subject
    const existingTopic = currentLibrary[subjectInput].find(t => t.title.toLowerCase() === topicInput.toLowerCase());

    if (existingTopic) {
      setActiveTopicId(existingTopic.id);
      setActiveTopicTitle(existingTopic.title);
      // Ensure it exists in lessonsByClass
      if (!currentLessons[existingTopic.id]) {
        onUpdateLessons(selectedClass, { ...currentLessons, [existingTopic.id]: { title: existingTopic.title, slides: [] } });
      }
    } else {
      // Create new topic
      const newTopicId = `t-${Date.now()}`;
      currentLibrary[subjectInput].push({
        id: newTopicId,
        title: topicInput,
        modules: [],
        icon: "📚"
      });
      onUpdateLibrary(selectedClass, currentLibrary);
      onUpdateLessons(selectedClass, { ...currentLessons, [newTopicId]: { title: topicInput, slides: [] } });
      
      setActiveTopicId(newTopicId);
      setActiveTopicTitle(topicInput);
    }

    setEditingIndex(null);
    setEditForm(null);
  };

  const handleEdit = (index) => {
    setEditingIndex(index);
    setEditForm({ ...topicData.slides[index] });
  };

  const handleAddNew = () => {
    const newSlide = { title: "New Chapter", content: "", example: "", visualizer: "" };
    setEditingIndex(topicData.slides.length);
    setEditForm(newSlide);
  };

  const handleSave = () => {
    const newLessons = { ...currentLessons };
    const newSlides = [...topicData.slides];
    
    if (editingIndex >= newSlides.length) {
      newSlides.push(editForm);
    } else {
      newSlides[editingIndex] = editForm;
    }

    newLessons[activeTopicId] = { ...topicData, slides: newSlides };
    onUpdateLessons(selectedClass, newLessons);
    setEditingIndex(null);
    setEditForm(null);
  };

  const handleDelete = (index) => {
    if (confirm("Are you sure you want to delete this chapter?")) {
      const newLessons = { ...currentLessons };
      const newSlides = [...topicData.slides];
      newSlides.splice(index, 1);
      newLessons[activeTopicId] = { ...topicData, slides: newSlides };
      onUpdateLessons(selectedClass, newLessons);
    }
  };

  const handleCancel = () => {
    setEditingIndex(null);
    setEditForm(null);
  };

  return (
    <div className="manage-lessons animate-slide-up">
      <header className="dashboard-header" style={{ flexDirection: 'column', alignItems: 'flex-start', gap: '1.5rem', marginBottom: '2rem' }}>
        <Button variant="ghost" onClick={() => navigate('/teacher')}><ArrowLeft size={20} /> Back to Dashboard</Button>
        <div className="welcome-text">
          <h1>Content Manager 📖</h1>
          <p>Create and edit study material that appears in the student's Library.</p>
        </div>
      </header>

      <div className="lesson-selector glass-panel" style={{ display: 'flex', gap: '1rem', alignItems: 'flex-end', flexWrap: 'wrap' }}>
        <div style={{ flex: '1 1 200px' }}>
          <label style={{ fontWeight: 'bold', color: 'var(--text-muted)', textTransform: 'uppercase' }}>1. Select Class</label>
          <select 
            className="topic-select"
            value={selectedClass}
            onChange={(e) => { 
              setSelectedClass(e.target.value); 
              setActiveTopicId(null);
              setSubjectInput("");
              setTopicInput("");
            }}
          >
            <option value="Class 1">Class 1</option>
            <option value="Class 2">Class 2</option>
            <option value="Class 3">Class 3</option>
            <option value="Class 4">Class 4</option>
            <option value="Class 5">Class 5</option>
          </select>
        </div>

        <div style={{ flex: '1 1 200px' }}>
          <label style={{ fontWeight: 'bold', color: 'var(--text-muted)', textTransform: 'uppercase' }}>2. Subject Name</label>
          <input 
            type="text"
            className="topic-select"
            placeholder="e.g. Science"
            value={subjectInput}
            onChange={(e) => setSubjectInput(e.target.value)}
          />
        </div>

        <div style={{ flex: '1 1 200px' }}>
          <label style={{ fontWeight: 'bold', color: 'var(--text-muted)', textTransform: 'uppercase' }}>3. Topic Name</label>
          <input 
            type="text"
            className="topic-select"
            placeholder="e.g. The Solar System"
            value={topicInput}
            onChange={(e) => setTopicInput(e.target.value)}
          />
        </div>

        <div style={{ flex: '0 0 auto', paddingBottom: '0.2rem' }}>
          <Button variant="primary" onClick={handleLoadCreateTopic}>
            <Search size={18} /> Load / Create
          </Button>
        </div>
      </div>

      {activeTopicId ? (
        <div className="chapters-section animate-fade-in">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
            <h2>Chapters for {activeTopicTitle}</h2>
            <Button variant="primary" onClick={handleAddNew} disabled={editingIndex !== null}>
              <PlusCircle size={20} /> Add Chapter
            </Button>
          </div>

          {topicData.slides.length === 0 && editingIndex === null && (
            <div className="glass-panel text-center" style={{ padding: '3rem' }}>
              <p>No chapters yet. Click "Add Chapter" to start creating content!</p>
            </div>
          )}

          <div className="chapters-grid">
            {topicData.slides.map((slide, index) => (
              <div key={index} className="chapter-card glass-panel">
                {editingIndex === index ? (
                  <div className="chapter-editor animate-fade-in">
                    <div className="editor-field">
                      <label>Chapter Title</label>
                      <input 
                        value={editForm.title} 
                        onChange={(e) => setEditForm({...editForm, title: e.target.value})} 
                        placeholder="e.g. Chapter 1: Introduction"
                      />
                    </div>
                    <div className="editor-field">
                      <label>3D Visualizer</label>
                      <select 
                        value={editForm.visualizer || ""} 
                        onChange={(e) => setEditForm({...editForm, visualizer: e.target.value})}
                      >
                        {VISUALIZERS.map(v => (
                          <option key={v.id} value={v.id}>{v.label}</option>
                        ))}
                      </select>
                    </div>
                    <div className="editor-field">
                      <label>Main Content</label>
                      <DefaultEditor 
                        value={editForm.content} 
                        onChange={(e) => setEditForm({...editForm, content: e.target.value})}
                        style={{ background: '#fff', borderRadius: '8px', minHeight: '150px' }}
                      />
                    </div>
                    <div className="editor-field">
                      <label>Example Code/Text (Optional)</label>
                      <DefaultEditor 
                        value={editForm.example || ""} 
                        onChange={(e) => setEditForm({...editForm, example: e.target.value})}
                        style={{ background: '#fff', borderRadius: '8px', minHeight: '100px' }}
                      />
                    </div>
                    <div className="editor-actions">
                      <Button variant="ghost" onClick={handleCancel}>Cancel</Button>
                      <Button variant="primary" onClick={handleSave} style={{ background: 'var(--success)' }}>
                        <Save size={18} /> Save Chapter
                      </Button>
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="chapter-header">
                      <h3>{index + 1}. {slide.title}</h3>
                      <div className="chapter-actions">
                        <Button variant="outline" size="sm" onClick={() => handleEdit(index)} disabled={editingIndex !== null}>
                          <Pencil size={16} /> Edit
                        </Button>
                        <Button variant="outline" size="sm" onClick={() => handleDelete(index)} disabled={editingIndex !== null} style={{ color: 'var(--error)', borderColor: 'rgba(239,68,68,0.2)' }}>
                          <Trash2 size={16} />
                        </Button>
                      </div>
                    </div>
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '0.5rem' }}>
                      Visualizer: <strong>{VISUALIZERS.find(v => v.id === slide.visualizer)?.label || "None"}</strong>
                    </p>
                    <p style={{ display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                      {stripFormatting(slide.content)}
                    </p>
                  </>
                )}
              </div>
            ))}

            {editingIndex === topicData.slides.length && (
               <div className="chapter-card glass-panel chapter-editor animate-fade-in" style={{ borderColor: 'var(--success)' }}>
                  <h3>Create New Chapter</h3>
                  <div className="editor-field">
                    <label>Chapter Title</label>
                    <input 
                      value={editForm.title} 
                      onChange={(e) => setEditForm({...editForm, title: e.target.value})} 
                      placeholder="e.g. Chapter 1: Introduction"
                    />
                  </div>
                  <div className="editor-field">
                    <label>3D Visualizer</label>
                    <select 
                      value={editForm.visualizer || ""} 
                      onChange={(e) => setEditForm({...editForm, visualizer: e.target.value})}
                    >
                      {VISUALIZERS.map(v => (
                        <option key={v.id} value={v.id}>{v.label}</option>
                      ))}
                    </select>
                  </div>
                  <div className="editor-field">
                    <label>Main Content</label>
                    <DefaultEditor 
                      value={editForm.content} 
                      onChange={(e) => setEditForm({...editForm, content: e.target.value})}
                      style={{ background: '#fff', borderRadius: '8px', minHeight: '150px' }}
                    />
                  </div>
                  <div className="editor-field">
                    <label>Example Code/Text (Optional)</label>
                    <DefaultEditor 
                      value={editForm.example || ""} 
                      onChange={(e) => setEditForm({...editForm, example: e.target.value})}
                      style={{ background: '#fff', borderRadius: '8px', minHeight: '100px' }}
                    />
                  </div>
                  <div className="editor-actions">
                    <Button variant="ghost" onClick={handleCancel}>Cancel</Button>
                    <Button variant="primary" onClick={handleSave} style={{ background: 'var(--success)' }}>
                      <Save size={18} /> Save Chapter
                    </Button>
                  </div>
               </div>
            )}

          </div>
        </div>
      ) : (
        <div className="glass-panel text-center" style={{ padding: '4rem 2rem' }}>
          <h2>Select or Create a Topic</h2>
          <p style={{ color: 'var(--text-muted)', maxWidth: '400px', margin: '1rem auto' }}>
            Enter a Subject and Topic name above, then click "Load / Create" to start building your lesson chapters.
          </p>
        </div>
      )}
    </div>
  );
};

export default ManageLessons;
