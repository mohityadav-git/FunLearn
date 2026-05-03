import React from 'react';
import { Trash2, Image as ImageIcon } from 'lucide-react';
import Button from './Button';

const QuestionEditor = ({ question, qIndex, onUpdate, onRemove, hideHeader = false }) => {
  const updateField = (field, value) => {
    onUpdate({ ...question, [field]: value });
  };

  const updateOptionText = (oIndex, value) => {
    const newOptions = [...question.options];
    newOptions[oIndex] = typeof newOptions[oIndex] === 'string' 
      ? value 
      : { ...newOptions[oIndex], text: value };
    onUpdate({ ...question, options: newOptions });
  };

  const updateOptionImage = (oIndex, file) => {
    if (!file) return;
    const imageUrl = URL.createObjectURL(file);
    const newOptions = [...question.options];
    newOptions[oIndex] = typeof newOptions[oIndex] === 'string'
      ? { text: newOptions[oIndex], imageUrl }
      : { ...newOptions[oIndex], imageUrl };
    onUpdate({ ...question, options: newOptions });
  };

  const removeOptionImage = (oIndex) => {
    const newOptions = [...question.options];
    if (typeof newOptions[oIndex] !== 'string') {
      newOptions[oIndex] = { ...newOptions[oIndex], imageUrl: null };
      onUpdate({ ...question, options: newOptions });
    }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      updateField('imageUrl', imageUrl);
    }
  };

  return (
    <div className="question-builder glass-panel animate-pop-in" style={{ padding: '2rem', marginBottom: '2rem', borderRadius: '1rem' }}>
      {!hideHeader && (
        <div className="qb-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', paddingBottom: '1rem', borderBottom: '1px solid rgba(0,0,0,0.05)' }}>
          <h3 style={{ margin: 0, color: 'var(--text-dark)' }}>Question {qIndex !== undefined ? qIndex + 1 : ''}</h3>
          {onRemove && (
            <Button variant="ghost" onClick={() => onRemove(question.id)}>
              <Trash2 size={18} color="var(--danger)" />
            </Button>
          )}
        </div>
      )}

      <div className="qb-body" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        <div className="form-group" style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <label style={{ fontSize: '0.875rem', fontWeight: 'bold', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Question Text</label>
          <input 
            value={question.text || ''} 
            onChange={(e) => updateField('text', e.target.value)} 
            placeholder="What is shown below?" 
            style={{ padding: '0.75rem 1rem', borderRadius: '8px', border: '1px solid #e2e8f0', width: '100%', boxSizing: 'border-box' }}
          />
        </div>

        <div className="image-upload-area" style={{ border: '2px dashed #cbd5e1', borderRadius: '12px', padding: '2rem', textAlign: 'center', background: '#f8fafc', transition: 'all 0.2s', cursor: 'pointer' }}>
          {question.imageUrl ? (
            <div className="image-preview" style={{ position: 'relative', display: 'inline-block' }}>
              <img src={question.imageUrl} alt="preview" style={{ maxHeight: '200px', borderRadius: '8px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)' }} />
              <div style={{ marginTop: '1rem' }}>
                <Button variant="outline" size="sm" onClick={(e) => { e.preventDefault(); updateField('imageUrl', null); }}>Remove Image</Button>
              </div>
            </div>
          ) : (
            <label className="image-dropzone" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem', cursor: 'pointer' }}>
              <input 
                type="file" 
                accept="image/*" 
                onChange={handleImageUpload} 
                style={{ display: 'none' }} 
              />
              <ImageIcon size={32} color="var(--text-muted)" />
              <span style={{ color: 'var(--text-muted)', fontWeight: 500 }}>Upload Question Image (Optional)</span>
            </label>
          )}
        </div>

        <div className="options-builder" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <label style={{ fontSize: '0.875rem', fontWeight: 'bold', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Options & Correct Answer</label>
          <p className="instruction-text" style={{ fontSize: '0.875rem', color: '#64748b', margin: '-0.5rem 0 0.5rem 0' }}>Add text and/or upload an image for each option. Select the radio to mark correct.</p>
          <div className="options-list" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {question.options.map((opt, oIndex) => {
              const textValue = typeof opt === 'string' ? opt : opt.text || '';
              const imgValue = typeof opt === 'string' ? null : opt.imageUrl;
              
              return (
                <div key={oIndex} className="option-input-row" style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem', background: question.correctAnswer === oIndex ? 'rgba(34, 197, 94, 0.05)' : '#fff', padding: '1rem', borderRadius: '8px', border: question.correctAnswer === oIndex ? '2px solid var(--success)' : '1px solid #e2e8f0', transition: 'all 0.2s' }}>
                  <label className="radio-label" style={{ paddingTop: '10px' }}>
                    <input 
                      type="radio" 
                      name={`correct-${question.id}`} 
                      checked={question.correctAnswer === oIndex}
                      onChange={() => updateField('correctAnswer', oIndex)}
                      style={{ width: '20px', height: '20px', accentColor: 'var(--success)', cursor: 'pointer' }}
                    />
                  </label>
                  
                  <div className="option-content-builder" style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <div className="opt-input-wrapper" style={{ display: 'flex', gap: '0.5rem' }}>
                      <input 
                        value={textValue} 
                        onChange={(e) => updateOptionText(oIndex, e.target.value)} 
                        placeholder={`Option ${oIndex + 1} Text`} 
                        style={{ flex: 1, padding: '0.75rem 1rem', borderRadius: '8px', border: '1px solid #cbd5e1' }}
                      />
                      <label className="icon-button" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '45px', background: '#f1f5f9', borderRadius: '8px', cursor: 'pointer', transition: 'background 0.2s' }}>
                        <input 
                          type="file" 
                          accept="image/*" 
                          onChange={(e) => updateOptionImage(oIndex, e.target.files[0])} 
                          style={{ display: 'none' }} 
                        />
                        <ImageIcon size={20} color="var(--primary)" />
                      </label>
                    </div>
                    
                    {imgValue && (
                      <div className="mini-preview" style={{ position: 'relative', display: 'inline-block', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '0.5rem', background: '#fff', width: 'fit-content' }}>
                        <img src={imgValue} alt="option preview" style={{ height: '60px', objectFit: 'contain', borderRadius: '4px' }} />
                        <div className="remove-img-btn" onClick={() => removeOptionImage(oIndex)} style={{ position: 'absolute', top: '-8px', right: '-8px', background: 'var(--danger)', color: '#fff', width: '20px', height: '20px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '14px', cursor: 'pointer', lineHeight: 1 }}>×</div>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="form-group" style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <label style={{ fontSize: '0.875rem', fontWeight: 'bold', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Hint (Optional)</label>
          <input 
            value={question.hint || ''} 
            onChange={(e) => updateField('hint', e.target.value)} 
            placeholder="E.g. It has 4 sides!" 
            style={{ padding: '0.75rem 1rem', borderRadius: '8px', border: '1px solid #e2e8f0', width: '100%', boxSizing: 'border-box' }}
          />
        </div>
      </div>
    </div>
  );
};

export default QuestionEditor;
