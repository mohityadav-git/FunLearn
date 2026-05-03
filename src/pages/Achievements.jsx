import React, { useState, useMemo } from 'react';
import {
  Trophy, Star, Zap, Target, Crown, Shield, Flame, Compass,
  Lightbulb, Rocket, BookOpen, Brain, Calculator, BookA, Shapes,
  Award, Medal, Gem, Heart, Clock, CheckCircle2, Lock, Sparkles,
  TrendingUp, GraduationCap, Eye
} from 'lucide-react';
import './Achievements.css';

const ACHIEVEMENT_DEFINITIONS = [
  // ── Journey Milestones ──
  {
    id: 'first-step',
    title: 'First Step',
    description: 'Solve your very first question',
    icon: <Compass size={28} />,
    category: 'Journey',
    tier: 'Common',
    requirement: { type: 'solved', count: 1 },
    color: '#3b82f6',
  },
  {
    id: 'curious-mind',
    title: 'Curious Mind',
    description: 'Solve 5 questions',
    icon: <Lightbulb size={28} />,
    category: 'Journey',
    tier: 'Common',
    requirement: { type: 'solved', count: 5 },
    color: '#eab308',
  },
  {
    id: 'quiz-apprentice',
    title: 'Quiz Apprentice',
    description: 'Solve 10 questions',
    icon: <BookOpen size={28} />,
    category: 'Journey',
    tier: 'Rare',
    requirement: { type: 'solved', count: 10 },
    color: '#8b5cf6',
  },
  {
    id: 'knowledge-seeker',
    title: 'Knowledge Seeker',
    description: 'Solve 25 questions',
    icon: <Eye size={28} />,
    category: 'Journey',
    tier: 'Rare',
    requirement: { type: 'solved', count: 25 },
    color: '#06b6d4',
  },
  {
    id: 'quiz-master',
    title: 'Quiz Master',
    description: 'Solve 50 questions',
    icon: <GraduationCap size={28} />,
    category: 'Journey',
    tier: 'Epic',
    requirement: { type: 'solved', count: 50 },
    color: '#f43f5e',
  },
  {
    id: 'grand-scholar',
    title: 'Grand Scholar',
    description: 'Solve 100 questions',
    icon: <Crown size={28} />,
    category: 'Journey',
    tier: 'Legendary',
    requirement: { type: 'solved', count: 100 },
    color: '#f59e0b',
  },

  // ── Star Collector ──
  {
    id: 'star-gazer',
    title: 'Star Gazer',
    description: 'Earn 100 stars',
    icon: <Star size={28} />,
    category: 'Stars',
    tier: 'Common',
    requirement: { type: 'stars', count: 100 },
    color: '#f59e0b',
  },
  {
    id: 'star-hunter',
    title: 'Star Hunter',
    description: 'Earn 500 stars',
    icon: <Sparkles size={28} />,
    category: 'Stars',
    tier: 'Rare',
    requirement: { type: 'stars', count: 500 },
    color: '#a855f7',
  },
  {
    id: 'star-champion',
    title: 'Star Champion',
    description: 'Earn 1,000 stars',
    icon: <Gem size={28} />,
    category: 'Stars',
    tier: 'Epic',
    requirement: { type: 'stars', count: 1000 },
    color: '#ec4899',
  },
  {
    id: 'star-legend',
    title: 'Star Legend',
    description: 'Earn 5,000 stars',
    icon: <Crown size={28} />,
    category: 'Stars',
    tier: 'Legendary',
    requirement: { type: 'stars', count: 5000 },
    color: '#f59e0b',
  },

  // ── Subject Mastery ──
  {
    id: 'math-beginner',
    title: 'Math Beginner',
    description: 'Solve 1 Mathematics question',
    icon: <Calculator size={28} />,
    category: 'Mastery',
    tier: 'Common',
    requirement: { type: 'subject', subject: 'Mathematics', count: 1 },
    color: '#3b82f6',
  },
  {
    id: 'math-whiz',
    title: 'Math Whiz',
    description: 'Solve 10 Mathematics questions',
    icon: <Calculator size={28} />,
    category: 'Mastery',
    tier: 'Rare',
    requirement: { type: 'subject', subject: 'Mathematics', count: 10 },
    color: '#3b82f6',
  },

  // ── Special ──
  {
    id: 'rising-star',
    title: 'Rising Star',
    description: 'Earn stars and solve 5+ quests — you\'re on your way!',
    icon: <TrendingUp size={28} />,
    category: 'Special',
    tier: 'Rare',
    requirement: { type: 'combo', stars: 200, solved: 5 },
    color: '#f43f5e',
  },
  {
    id: 'exam-warrior',
    title: 'Exam Warrior',
    description: 'Earn 2,000 stars and solve 30 quests',
    icon: <Shield size={28} />,
    category: 'Special',
    tier: 'Legendary',
    requirement: { type: 'combo', stars: 2000, solved: 30 },
    color: '#6366f1',
  },
];

const TIER_CONFIG = {
  Common:    { label: 'Common',    gradient: 'linear-gradient(135deg, #94a3b8, #64748b)', glow: 'rgba(100, 116, 139, 0.4)' },
  Rare:      { label: 'Rare',      gradient: 'linear-gradient(135deg, #818cf8, #6366f1)', glow: 'rgba(99, 102, 241, 0.4)' },
  Epic:      { label: 'Epic',      gradient: 'linear-gradient(135deg, #c084fc, #a855f7)', glow: 'rgba(168, 85, 247, 0.4)' },
  Legendary: { label: 'Legendary', gradient: 'linear-gradient(135deg, #fbbf24, #f59e0b)', glow: 'rgba(245, 158, 11, 0.5)' },
};

const CATEGORIES = ['All', 'Journey', 'Stars', 'Mastery', 'Special'];

function computeProgress(achievement, stars, solvedQuestions, bank) {
  const req = achievement.requirement;

  if (req.type === 'solved') {
    return { current: solvedQuestions.length, target: req.count };
  }
  if (req.type === 'stars') {
    return { current: stars, target: req.count };
  }
  if (req.type === 'subject') {
    const subjectSolved = solvedQuestions.filter(qId => {
      const q = bank.find(b => b.id === qId);
      return q && q.subject === req.subject;
    }).length;
    return { current: subjectSolved, target: req.count };
  }
  if (req.type === 'all-subjects') {
    const allSubjects = ['Mathematics', 'English', 'Verbal Reasoning', 'Spatial Reasoning'];
    const subjectsDone = allSubjects.filter(sub =>
      solvedQuestions.some(qId => {
        const q = bank.find(b => b.id === qId);
        return q && q.subject === sub;
      })
    ).length;
    return { current: subjectsDone, target: allSubjects.length };
  }
  if (req.type === 'combo') {
    const starsProg = Math.min(stars / req.stars, 1);
    const solvedProg = Math.min(solvedQuestions.length / req.solved, 1);
    const avgProg = (starsProg + solvedProg) / 2;
    return { current: Math.round(avgProg * 100), target: 100 };
  }
  return { current: 0, target: 1 };
}

const AchievementCard = ({ achievement, progress, unlocked, index }) => {
  const tier = TIER_CONFIG[achievement.tier];
  const pct = Math.min((progress.current / progress.target) * 100, 100);

  return (
    <div
      className={`achievement-card ${unlocked ? 'unlocked' : 'locked'} tier-${achievement.tier.toLowerCase()}`}
      style={{ animationDelay: `${index * 0.06}s` }}
    >
      {unlocked && <div className="card-glow" style={{ background: tier.glow }} />}

      <div className="achievement-icon-wrap" style={{ background: unlocked ? tier.gradient : 'var(--bg-soft)' }}>
        <div className="achievement-icon" style={{ color: unlocked ? '#fff' : '#94a3b8' }}>
          {achievement.icon}
        </div>
        {unlocked && (
          <div className="unlocked-check">
            <CheckCircle2 size={16} />
          </div>
        )}
        {!unlocked && (
          <div className="locked-icon">
            <Lock size={14} />
          </div>
        )}
      </div>

      <div className="achievement-info">
        <h4 className="achievement-title">{achievement.title}</h4>
        <p className="achievement-desc">{achievement.description}</p>

        <div className="tier-badge" style={{ background: tier.gradient }}>
          {tier.label}
        </div>
      </div>

      <div className="achievement-progress-section">
        <div className="progress-track">
          <div
            className="progress-fill"
            style={{
              width: `${pct}%`,
              background: unlocked ? tier.gradient : 'var(--text-muted)',
            }}
          />
        </div>
        <span className="progress-label">
          {unlocked ? '✓ Unlocked' : `${progress.current} / ${progress.target}`}
        </span>
      </div>
    </div>
  );
};

const Achievements = ({ stars, solvedQuestions, bank }) => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [showUnlockedOnly, setShowUnlockedOnly] = useState(false);

  const enriched = useMemo(() => {
    return ACHIEVEMENT_DEFINITIONS.map(ach => {
      const progress = computeProgress(ach, stars, solvedQuestions, bank);
      const unlocked = progress.current >= progress.target;
      return { ...ach, progress, unlocked };
    });
  }, [stars, solvedQuestions, bank]);

  const filtered = useMemo(() => {
    let list = enriched;
    if (activeCategory !== 'All') {
      list = list.filter(a => a.category === activeCategory);
    }
    if (showUnlockedOnly) {
      list = list.filter(a => a.unlocked);
    }
    // unlocked first, then by tier weight
    const tierWeight = { Legendary: 0, Epic: 1, Rare: 2, Common: 3 };
    list.sort((a, b) => {
      if (a.unlocked !== b.unlocked) return a.unlocked ? -1 : 1;
      return tierWeight[a.tier] - tierWeight[b.tier];
    });
    return list;
  }, [enriched, activeCategory, showUnlockedOnly]);

  const totalUnlocked = enriched.filter(a => a.unlocked).length;
  const totalAchievements = enriched.length;
  const overallPct = Math.round((totalUnlocked / totalAchievements) * 100);

  const tierCounts = useMemo(() => {
    const counts = { Common: 0, Rare: 0, Epic: 0, Legendary: 0 };
    enriched.filter(a => a.unlocked).forEach(a => counts[a.tier]++);
    return counts;
  }, [enriched]);

  return (
    <div className="achievements-page animate-slide-up">
      {/* Hero Banner */}
      <section className="achievements-hero">
        <div className="hero-bg-shapes">
          <div className="shape shape-1" />
          <div className="shape shape-2" />
          <div className="shape shape-3" />
        </div>
        <div className="hero-content">
          <div className="hero-icon">
            <Trophy size={40} />
          </div>
          <div className="hero-text">
            <h1>Achievements</h1>
            <p>Track your badges and unlock new milestones as you learn!</p>
          </div>
        </div>

        {/* Overall Summary */}
        <div className="hero-stats">
          <div className="hero-stat-ring">
            <svg viewBox="0 0 100 100" className="ring-svg">
              <circle cx="50" cy="50" r="42" className="ring-bg" />
              <circle
                cx="50" cy="50" r="42"
                className="ring-fill"
                style={{ strokeDashoffset: `${264 - (264 * overallPct) / 100}` }}
              />
            </svg>
            <div className="ring-label">
              <span className="ring-value">{overallPct}%</span>
              <span className="ring-sub">Complete</span>
            </div>
          </div>
          <div className="hero-stat-details">
            <div className="detail-row">
              <span className="detail-number">{totalUnlocked}</span>
              <span className="detail-text">of {totalAchievements} Unlocked</span>
            </div>
            <div className="tier-summary">
              {Object.entries(TIER_CONFIG).map(([key, config]) => (
                <div key={key} className="tier-pill" style={{ background: config.gradient }}>
                  {tierCounts[key]} {config.label}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Filter Bar */}
      <section className="achievements-filters">
        <div className="category-tabs">
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              className={`cat-tab ${activeCategory === cat ? 'active' : ''}`}
              onClick={() => setActiveCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
        <label className="toggle-unlocked">
          <input
            type="checkbox"
            checked={showUnlockedOnly}
            onChange={(e) => setShowUnlockedOnly(e.target.checked)}
          />
          <span className="toggle-slider" />
          <span className="toggle-text">Unlocked only</span>
        </label>
      </section>

      {/* Achievements Grid */}
      <section className="achievements-grid">
        {filtered.length === 0 && (
          <div className="empty-state">
            <Lock size={48} />
            <h3>No achievements here yet</h3>
            <p>Keep solving questions and earning stars to unlock badges!</p>
          </div>
        )}
        {filtered.map((ach, i) => (
          <AchievementCard
            key={ach.id}
            achievement={ach}
            progress={ach.progress}
            unlocked={ach.unlocked}
            index={i}
          />
        ))}
      </section>
    </div>
  );
};

export default Achievements;
