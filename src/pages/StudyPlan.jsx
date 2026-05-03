import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Star, Lock, Sparkles, CheckCircle, BookOpen, Target, X } from 'lucide-react';
import Button from '../components/Button';
import './StudyPlan.css';

// Fun game-style level configs
const LEVEL_THEMES = {
  Foundation: {
    emoji: '🌱',
    label: 'Easy Peasy',
    animal: '🐣',
    bg: 'linear-gradient(135deg, #34d399, #6ee7b7)',
    shadow: 'rgba(52, 211, 153, 0.4)',
    stars: 1,
  },
  Intermediate: {
    emoji: '🌟',
    label: 'Getting Tricky!',
    animal: '🦊',
    bg: 'linear-gradient(135deg, #fbbf24, #f59e0b)',
    shadow: 'rgba(251, 191, 36, 0.4)',
    stars: 2,
  },
  Advanced: {
    emoji: '🚀',
    label: 'Super Brain!',
    animal: '🦁',
    bg: 'linear-gradient(135deg, #f43f5e, #ec4899)',
    shadow: 'rgba(244, 63, 94, 0.4)',
    stars: 3,
  },
};

const CHAPTER_EMOJIS = ['🏝️', '🏔️', '🌋', '🏰', '🎪', '🌈', '🎠', '🎡'];
const LEVELS = ['Foundation', 'Intermediate', 'Advanced'];

const LevelModal = ({ isOpen, onClose, levelData, topic, subjectName, onRead, onTest }) => {
  if (!isOpen) return null;

  const theme = LEVEL_THEMES[levelData.level];
  const { read, test1, test2, test3 } = levelData.tasks;

  const getTaskStatus = (task) => {
    if (task === 'read') return read ? 'completed' : 'current';
    if (task === 'test1') return test1 ? 'completed' : (read ? 'current' : 'locked');
    if (task === 'test2') return test2 ? 'completed' : (test1 ? 'current' : 'locked');
    if (task === 'test3') return test3 ? 'completed' : (test2 ? 'current' : 'locked');
  };

  return createPortal(
    <div className="level-modal-overlay" onClick={onClose}>
      <div className="level-modal-content" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <h2>{theme.emoji} {theme.label} Tasks</h2>
          <Button variant="ghost" size="sm" onClick={onClose}><X size={20} /></Button>
        </div>
        <p style={{ color: 'var(--text-muted)' }}>Complete these tasks in order to unlock the next part of {topic.title}!</p>
        
        <div className="task-list">
          {/* Read Task */}
          <div className={`task-item ${getTaskStatus('read')}`}>
            <div className="task-info">
              <span className="task-title"><BookOpen size={16} style={{display:'inline', marginBottom:'-3px'}}/> Learn & Read</span>
              <span className="task-desc">Read the study material</span>
            </div>
            <div className="task-action">
              {getTaskStatus('read') === 'completed' ? (
                <CheckCircle color="var(--success)" />
              ) : (
                <Button size="sm" onClick={onRead}>Read</Button>
              )}
            </div>
          </div>

          {/* Test 1 */}
          <div className={`task-item ${getTaskStatus('test1')}`}>
            <div className="task-info">
              <span className="task-title"><Target size={16} style={{display:'inline', marginBottom:'-3px'}}/> Assessment 1</span>
              <span className="task-desc">Score 5/5 to pass</span>
            </div>
            <div className="task-action">
              {getTaskStatus('test1') === 'completed' ? <CheckCircle color="var(--success)" /> : 
               getTaskStatus('test1') === 'locked' ? <Lock size={16} color="var(--text-muted)"/> :
               <Button size="sm" onClick={() => onTest(1)}>Start</Button>}
            </div>
          </div>

          {/* Test 2 */}
          <div className={`task-item ${getTaskStatus('test2')}`}>
            <div className="task-info">
              <span className="task-title"><Target size={16} style={{display:'inline', marginBottom:'-3px'}}/> Assessment 2</span>
              <span className="task-desc">Score 5/5 to pass</span>
            </div>
            <div className="task-action">
              {getTaskStatus('test2') === 'completed' ? <CheckCircle color="var(--success)" /> : 
               getTaskStatus('test2') === 'locked' ? <Lock size={16} color="var(--text-muted)"/> :
               <Button size="sm" onClick={() => onTest(2)}>Start</Button>}
            </div>
          </div>

          {/* Test 3 */}
          <div className={`task-item ${getTaskStatus('test3')}`}>
            <div className="task-info">
              <span className="task-title"><Target size={16} style={{display:'inline', marginBottom:'-3px'}}/> Assessment 3</span>
              <span className="task-desc">Final test! Score 5/5</span>
            </div>
            <div className="task-action">
              {getTaskStatus('test3') === 'completed' ? <CheckCircle color="var(--success)" /> : 
               getTaskStatus('test3') === 'locked' ? <Lock size={16} color="var(--text-muted)"/> :
               <Button size="sm" onClick={() => onTest(3)}>Start</Button>}
            </div>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
};

const LevelBubble = ({ level, index, status, onClick }) => {
  const theme = LEVEL_THEMES[level] || LEVEL_THEMES.Foundation;
  const isCompleted = status === 'completed';
  const isCurrent = status === 'current';
  const isLocked = status === 'locked';

  return (
    <div
      className={`game-bubble ${status} ${isCurrent ? 'bounce' : ''}`}
      style={{
        '--bubble-bg': theme.bg,
        '--bubble-shadow': theme.shadow,
        animationDelay: `${index * 0.15}s`,
      }}
      onClick={() => !isLocked && onClick()}
    >
      {index > 0 && <div className="connector-line" />}

      <div className={`bubble-circle ${status}`}>
        {isLocked ? (
          <Lock size={28} className="lock-icon" />
        ) : (
          <span className="bubble-animal">{theme.animal}</span>
        )}

        <div className="bubble-stars">
          {[...Array(theme.stars)].map((_, i) => (
            <Star
              key={i}
              size={14}
              className={`mini-star ${isCompleted ? 'earned' : ''}`}
              fill={isCompleted ? '#fbbf24' : 'none'}
              color={isCompleted ? '#fbbf24' : '#cbd5e1'}
            />
          ))}
        </div>

        {isCompleted && (
          <div className="completed-badge">
            <Sparkles size={16} />
          </div>
        )}

        {isCurrent && <div className="pulse-ring" />}
      </div>

      <div className="bubble-label">
        <span className="bubble-type">{theme.emoji} {theme.label}</span>
      </div>
    </div>
  );
};

const StudyPlan = ({ libraryByClass, roadmapProgress, currentUser }) => {
  const { subjectName } = useParams();
  const navigate = useNavigate();
  const [activeModal, setActiveModal] = useState(null); // { topic, level, tasks }
  
  const classLevel = currentUser?.classLevel || "Class 1";
  const classLibrary = libraryByClass[classLevel] || {};
  const topics = classLibrary[subjectName] || [];

  // Helper to get progress for a specific topic and level
  const getProgress = (topicId, level) => {
    const classData = roadmapProgress[classLevel] || {};
    const subjectData = classData[subjectName] || {};
    const topicData = subjectData[topicId] || {};
    return topicData[level] || { read: false, test1: false, test2: false, test3: false };
  };

  const isLevelCompleted = (tasks) => {
    return tasks.read && tasks.test1 && tasks.test2 && tasks.test3;
  };

  return (
    <div className="study-plan-game animate-slide-up">
      <header className="game-header">
        <Button variant="ghost" onClick={() => navigate(`/student/subject/${subjectName}`)}>
          <ArrowLeft size={18} /> Back
        </Button>
        <div className="game-title-area">
          <div className="game-title-row">
            <span className="game-title-mascot">🗺️</span>
            <h1>Roadmap Adventure</h1>
          </div>
          <p className="game-subtitle">
            Complete the reading and tests to unlock the next level! 🎯
          </p>
        </div>
      </header>

      <div className="adventure-path">
        {topics.length > 0 ? (
          topics.map((topic, chIdx) => {
            
            // Calculate overall progress for this topic
            let numCompletedLevels = 0;

            return (
              <div key={topic.id} className="island-group" style={{ animationDelay: `${chIdx * 0.2}s` }}>
                <div className="island-header">
                  <div className="island-emoji">
                    {CHAPTER_EMOJIS[chIdx % CHAPTER_EMOJIS.length]}
                  </div>
                  <div className="island-title">
                    <h2>Island {chIdx + 1}</h2>
                    <span className="island-name">{topic.title}</span>
                  </div>
                  <div className="island-progress">
                    {/* We'll count completed levels in the bubble mapping */}
                    <Star size={14} fill="#fbbf24" color="#fbbf24" />
                  </div>
                </div>

                <div className="bubble-path">
                  {LEVELS.map((level, lIdx) => {
                    const tasks = getProgress(topic.id, level);
                    const isCompleted = isLevelCompleted(tasks);
                    
                    if (isCompleted) numCompletedLevels++;

                    // Determine status
                    let status = 'locked';
                    if (lIdx === 0) {
                      status = isCompleted ? 'completed' : 'current';
                    } else {
                      const prevTasks = getProgress(topic.id, LEVELS[lIdx - 1]);
                      const isPrevCompleted = isLevelCompleted(prevTasks);
                      if (isPrevCompleted) {
                        status = isCompleted ? 'completed' : 'current';
                      }
                    }

                    return (
                      <LevelBubble
                        key={level}
                        level={level}
                        index={lIdx}
                        status={status}
                        onClick={() => {
                          setActiveModal({ topic, level, tasks });
                        }}
                      />
                    );
                  })}
                </div>
              </div>
            );
          })
        ) : (
          <div className="empty-island glass-panel">
            <span className="empty-emoji">🏗️</span>
            <h3>Building this island...</h3>
            <p>Your teacher is still creating the {subjectName} roadmap! Check back soon!</p>
          </div>
        )}
      </div>

      {activeModal && (
        <LevelModal
          isOpen={true}
          onClose={() => setActiveModal(null)}
          levelData={activeModal}
          topic={activeModal.topic}
          subjectName={subjectName}
          onRead={() => {
            navigate(`/student/subject/${subjectName}/read/${activeModal.topic.id}?part=${activeModal.level}`);
          }}
          onTest={(testNum) => {
            navigate(`/student/subject/${subjectName}/roadmap-test/${activeModal.topic.id}/${activeModal.level}/${testNum}`);
          }}
        />
      )}
    </div>
  );
};

export default StudyPlan;
