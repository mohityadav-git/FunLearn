import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Target, Calendar, Trophy, Lock, CheckCircle2, Play, Zap } from 'lucide-react';
import Button from '../components/Button';
import { QUEST_DATA } from '../data/subjectContent';
import './SubjectQuest.css';

const SubjectQuest = () => {
  const { subjectName } = useParams();
  const navigate = useNavigate();
  const quests = QUEST_DATA[subjectName] || null;

  if (!quests) {
    return (
      <div className="quest-board-container">
        <Button variant="ghost" onClick={() => navigate(`/student/subject/${subjectName}`)}>
          <ArrowLeft size={18} /> Back to Hub
        </Button>
        <div className="empty-state card-panel">
          <p>No quests found for {subjectName}.</p>
        </div>
      </div>
    );
  }

  const renderQuestCard = (type, data) => {
    const isLocked = data.status === 'locked';
    const isCompleted = data.status === 'completed';

    const typeIcons = {
      daily: <Target size={32} />,
      weekly: <Calendar size={32} />,
      monthly: <Trophy size={32} />
    };

    const typeLabels = {
      daily: 'Daily Target',
      weekly: 'Weekly Test',
      monthly: 'Monthly Test'
    };

    return (
      <div className={`quest-card card-panel ${type} ${data.status}`}>
        <div className="quest-card-header">
          <div className="quest-badge">{typeLabels[type]}</div>
          {isLocked && <Lock size={18} className="lock-icon" />}
          {isCompleted && <CheckCircle2 size={18} className="complete-icon" />}
        </div>
        
        <div className="quest-card-body">
          <div className="quest-icon-wrapper">
             {typeIcons[type]}
          </div>
          <div className="quest-info">
            <h3>{data.title}</h3>
            <p>{type === 'daily' ? `${data.questions} Questions` : data.duration}</p>
          </div>
        </div>

        <div className="quest-card-footer">
          <div className="quest-reward">
            <Zap size={16} fill="var(--accent)" color="var(--accent)" />
            <span>+{data.reward} Stars</span>
          </div>
          {!isLocked && !isCompleted && (
            <Button variant="primary" size="sm" onClick={() => navigate('/student')}>
              Start <Play size={14} fill="white" />
            </Button>
          )}
          {isCompleted && <span className="status-text">Completed</span>}
          {isLocked && <span className="status-text">Unlock in 4 days</span>}
        </div>
      </div>
    );
  };

  return (
    <div className="quest-board-container animate-slide-up">
      <header className="quest-header">
        <Button variant="ghost" onClick={() => navigate(`/student/subject/${subjectName}`)}>
          <ArrowLeft size={18} /> Back to Hub
        </Button>
        <div className="quest-title-section">
          <h1>{subjectName} Quest Board ⚔️</h1>
          <p>Complete your assessments to earn massive rewards!</p>
        </div>
      </header>

      <div className="quest-board-grid">
         {renderQuestCard('daily', quests.daily)}
         {renderQuestCard('weekly', quests.weekly)}
         {renderQuestCard('monthly', quests.monthly)}
      </div>

      <section className="quest-bonus card-panel">
        <div className="bonus-icon">🎁</div>
        <div className="bonus-text">
          <h3>Perfect Week Bonus</h3>
          <p>Complete all 7 Daily Targets this week to unlock the Golden Treasure Chest!</p>
        </div>
        <div className="bonus-progress">
          <div className="progress-track">
            <div className="progress-fill" style={{ width: '60%' }}></div>
          </div>
          <span>4/7 Days</span>
        </div>
      </section>
    </div>
  );
};

export default SubjectQuest;
