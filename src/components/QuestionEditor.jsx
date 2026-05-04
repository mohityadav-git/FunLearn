import React, { useState } from 'react';
import { Trash2, Image as ImageIcon, Calculator } from 'lucide-react';
import { DefaultEditor } from 'react-simple-wysiwyg';
import Button from './Button';

const mathSymbols = ['²', '³', '½', '¼', '¾', '√', 'π', 'θ', '°', '≤', '≥', '±', '≠', '∞', 'α', 'β', 'γ', 'Δ', 'Σ', '÷', '×', '≈'];

const QuestionEditor = ({ question, qIndex, onUpdate, onRemove, hideHeader = false }) => {
  const [activeInput, setActiveInput] = useState({ type: 'text', index: null });
  const [showKeyboard, setShowKeyboard] = useState(false);

  const insertSymbol = (sym) => {
    if (activeInput.type === 'text') {
      updateField('text', (question.text || '') + sym);
    } else if (activeInput.type === 'option' && activeInput.index !== null) {
      const textValue = typeof question.options[activeInput.index] === 'string' 
        ? question.options[activeInput.index] 
        : question.options[activeInput.index].text || '';
      updateOptionText(activeInput.index, textValue + sym);
    } else if (activeInput.type === 'hint') {
      updateField('hint', (question.hint || '') + sym);
    }
  };
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
        <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '-1rem' }}>
          <Button variant="outline" size="sm" onClick={() => setShowKeyboard(!showKeyboard)} style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
            <Calculator size={16} /> {showKeyboard ? 'Hide Math Symbols' : 'Show Math Symbols'}
          </Button>
        </div>
        
        {showKeyboard && (
          <div className="special-keyboard glass-panel" style={{ padding: '1rem', borderRadius: '8px', display: 'flex', flexWrap: 'wrap', gap: '0.5rem', background: '#f8fafc', border: '1px solid #cbd5e1' }}>
            {mathSymbols.map(sym => (
              <button
                key={sym}
                onClick={() => insertSymbol(sym)}
                style={{ width: '36px', height: '36px', borderRadius: '6px', border: '1px solid #e2e8f0', background: '#fff', fontSize: '1.125rem', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', transition: 'all 0.2s', boxShadow: '0 1px 2px rgba(0,0,0,0.05)' }}
                className="hover-bg-primary hover-text-white"
                title={`Insert ${sym}`}
              >
                {sym}
              </button>
            ))}
            <div style={{ width: '100%', fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.5rem' }}>
              Click a symbol to append it to the currently focused input field.
            </div>
          </div>
        )}

        <div className="form-group" style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <label style={{ fontSize: '0.875rem', fontWeight: 'bold', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Question Text</label>
          <DefaultEditor 
            value={question.text || ''} 
            onChange={(e) => updateField('text', e.target.value)} 
            onFocus={() => setActiveInput({ type: 'text', index: null })}
            style={{ background: '#fff', borderRadius: '8px', minHeight: '100px' }}
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
                      <div style={{ flex: 1 }}>
                        <DefaultEditor 
                          value={textValue} 
                          onChange={(e) => updateOptionText(oIndex, e.target.value)} 
                          onFocus={() => setActiveInput({ type: 'option', index: oIndex })}
                          style={{ background: '#fff', borderRadius: '8px', minHeight: '80px' }}
                        />
                      </div>
                      <label className="icon-button" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '45px', background: '#f1f5f9', borderRadius: '8px', cursor: 'pointer', transition: 'background 0.2s', alignSelf: 'flex-start', height: '42px' }}>
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
          <DefaultEditor 
            value={question.hint || ''} 
            onChange={(e) => updateField('hint', e.target.value)} 
            onFocus={() => setActiveInput({ type: 'hint', index: null })}
            style={{ background: '#fff', borderRadius: '8px', minHeight: '100px' }}
          />
        </div>
      </div>
    </div>
  );
};

export default QuestionEditor;
