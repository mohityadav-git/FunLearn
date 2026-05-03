import React from 'react';
import { Star, Zap, Trophy, Compass, Lightbulb, Crown } from 'lucide-react';
import './SidebarRight.css';

const SidebarRight = ({ stars, streak = 3 }) => {
  const nextMilestone = 1000;
  const progress = (stars % nextMilestone) / (nextMilestone / 100);

  return (
    <aside className="sidebar-right animate-slide-up">
      <div className="profile-section card-panel">
        <div className="profile-avatar">😊</div>
        <div className="profile-info">
          <h3>Alex Johnson</h3>
          <p>Level 12 Scholar</p>
        </div>
      </div>

      <div className="stats-container">
        <div className="stat-card card-panel">
          <div className="stat-header">
            <Star fill="var(--accent)" color="var(--accent)" size={20} />
            <span>Total Stars</span>
          </div>
          <div className="stat-value">{stars}</div>
          <div className="progress-mini">
            <div className="progress-bar-fill" style={{ width: `${progress}%` }}></div>
          </div>
          <p className="milestone-text">{nextMilestone - (stars % nextMilestone)} more to Level Up!</p>
        </div>

        <div className="stat-card card-panel streak">
          <div className="stat-header">
            <Zap fill="var(--warning)" color="var(--warning)" size={20} />
            <span>Daily Streak</span>
          </div>
          <div className="stat-value">{streak} Days</div>
          <p className="streak-msg">You're on fire! 🔥</p>
        </div>
      </div>

      <div className="achievements-section card-panel">
        <div className="section-title">
          <Trophy size={18} color="var(--primary)" />
          <h4>Badges</h4>
        </div>
        <div className="badges-grid">
          <div className="badge tooltip" title="Beginner Explorer">
            <Compass size={24} color="#3b82f6" />
          </div>
          <div className="badge tooltip" title="Bright Spark">
            <Lightbulb size={24} color="#eab308" />
          </div>
          <div className="badge locked tooltip" title="Exam Pro">
            <Crown size={24} color="#cbd5e1" />
          </div>
        </div>
      </div>
    </aside>
  );
};

export default SidebarRight;
