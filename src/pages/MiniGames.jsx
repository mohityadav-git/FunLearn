import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Star, RotateCcw } from 'lucide-react';
import './MiniGames.css';

// ────────────────────────────────────────────────
//  NUMBER WORDS for shouting
// ────────────────────────────────────────────────
const NUMBER_WORDS = ['', 'ONE!', 'TWO!', 'THREE!', 'FOUR!', 'FIVE!', 'SIX!', 'SEVEN!', 'EIGHT!', 'NINE!', 'TEN!'];
const CHEER_MESSAGES = ['Amazing! 🎉', 'Awesome! ⭐', 'Great Job! 🌟', 'You Rock! 🚀', 'Super! 💫', 'Wow! 🎊'];

// ────────────────────────────────────────────────
//  GAME 1: ROAD TRIP COUNTING
//  A car drives from A to B, collecting items
// ────────────────────────────────────────────────
const ROAD_LEVELS = [
  { items: ['🌳', '🌳', '🌳'], question: 'Count the trees as the car drives by!', bg: 'road' },
  { items: ['⭐', '⭐', '⭐', '⭐'], question: 'Count the stars on the road!', bg: 'night' },
  { items: ['🏠', '🏠'], question: 'How many houses did we pass?', bg: 'road' },
  { items: ['🐄', '🐄', '🐄', '🐄', '🐄'], question: 'Count the cows on the farm!', bg: 'farm' },
  { items: ['🎈', '🎈', '🎈', '🎈', '🎈', '🎈'], question: 'Count all the balloons!', bg: 'sky' },
];

const RoadTripGame = ({ onComplete }) => {
  const [levelIdx, setLevelIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [carPosition, setCarPosition] = useState(0); // 0 to 100
  const [collectedCount, setCollectedCount] = useState(0);
  const [shoutText, setShoutText] = useState('');
  const [shoutKey, setShoutKey] = useState(0);
  const [itemStates, setItemStates] = useState([]);
  const [phase, setPhase] = useState('driving'); // 'driving' | 'counting' | 'answering' | 'celebrate'
  const [feedback, setFeedback] = useState(null);
  const animRef = useRef(null);
  const level = ROAD_LEVELS[levelIdx % ROAD_LEVELS.length];

  // Initialize item positions
  useEffect(() => {
    const states = level.items.map((item, i) => ({
      emoji: item,
      position: 15 + (i * (70 / level.items.length)),
      collected: false,
      visible: true,
    }));
    setItemStates(states);
    setCollectedCount(0);
    setCarPosition(0);
    setPhase('driving');
    setFeedback(null);
    setShoutText('');
  }, [levelIdx]);

  // Animate car driving
  useEffect(() => {
    if (phase !== 'driving') return;

    let pos = 0;
    const speed = 0.3;
    const drive = () => {
      pos += speed;
      setCarPosition(pos);

      // Check for item collection
      setItemStates(prev => {
        let newStates = [...prev];
        let collected = false;
        newStates.forEach((item, idx) => {
          if (!item.collected && Math.abs(pos - item.position) < 5) {
            newStates[idx] = { ...item, collected: true };
            collected = true;
            const count = newStates.filter(s => s.collected).length;
            setCollectedCount(count);
            setShoutText(NUMBER_WORDS[count] || `${count}!`);
            setShoutKey(k => k + 1);
          }
        });
        return collected ? newStates : prev;
      });

      if (pos >= 95) {
        setPhase('answering');
        return;
      }
      animRef.current = requestAnimationFrame(drive);
    };
    animRef.current = requestAnimationFrame(drive);
    return () => cancelAnimationFrame(animRef.current);
  }, [phase]);

  const handleAnswer = (num) => {
    if (feedback) return;
    if (num === level.items.length) {
      setFeedback('correct');
      setScore(s => s + 10);
      setPhase('celebrate');
      setTimeout(() => {
        if (levelIdx >= ROAD_LEVELS.length - 1) {
          onComplete(score + 10);
        } else {
          setLevelIdx(i => i + 1);
          setFeedback(null);
        }
      }, 1500);
    } else {
      setFeedback('wrong');
      setTimeout(() => setFeedback(null), 800);
    }
  };

  const options = [];
  for (let i = Math.max(1, level.items.length - 1); i <= level.items.length + 2; i++) {
    if (!options.includes(i)) options.push(i);
  }

  const bgClass = `road-bg-${level.bg}`;

  return (
    <div className="game-area road-trip-game">
      <div className="game-score">
        <Star size={18} fill="#fbbf24" color="#fbbf24" />
        <span>{score}</span>
      </div>

      <h2 className="game-question">{level.question}</h2>

      {/* Road Scene */}
      <div className={`road-scene ${bgClass}`}>
        {/* Sky decorations */}
        <div className="sky-layer">
          {level.bg === 'night' && (
            <>
              <span className="sky-star" style={{ left: '10%', top: '15%' }}>✨</span>
              <span className="sky-star" style={{ left: '30%', top: '8%' }}>✨</span>
              <span className="sky-star" style={{ left: '60%', top: '20%' }}>✨</span>
              <span className="sky-star" style={{ left: '80%', top: '10%' }}>✨</span>
            </>
          )}
          {level.bg === 'sky' && <span className="sun-emoji">☀️</span>}
          {level.bg === 'farm' && <span className="sun-emoji">🌤️</span>}
        </div>

        {/* Road */}
        <div className="road-strip">
          <div className="road-line" />
        </div>

        {/* Items on road */}
        {itemStates.map((item, i) => (
          <div
            key={i}
            className={`road-item ${item.collected ? 'collected' : ''}`}
            style={{ left: `${item.position}%` }}
          >
            <span className="road-item-emoji">{item.emoji}</span>
            {item.collected && (
              <span className="collect-number" key={`n-${i}-${item.collected}`}>
                {itemStates.filter((s, idx) => s.collected && idx <= i).length}
              </span>
            )}
          </div>
        ))}

        {/* Car */}
        <div className="car-container" style={{ left: `${carPosition}%` }}>
          <span className="car-emoji">🚗</span>
          <div className="car-dust">💨</div>
        </div>

        {/* Start / End flags */}
        <div className="flag flag-start">🏁 A</div>
        <div className="flag flag-end">B 🏁</div>
      </div>

      {/* Shout Text */}
      {shoutText && (
        <div className="shout-container" key={shoutKey}>
          <span className="shout-text">{shoutText}</span>
        </div>
      )}

      {/* Answer phase */}
      {phase === 'answering' && (
        <div className="answer-section">
          <p className="answer-prompt">How many did you count? 🤔</p>
          <div className="answer-buttons">
            {options.map(num => (
              <button
                key={num}
                className={`answer-btn ${feedback === 'correct' && num === level.items.length ? 'correct' : ''} ${feedback === 'wrong' ? 'shake' : ''}`}
                onClick={() => handleAnswer(num)}
              >
                {num}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Celebrate */}
      {phase === 'celebrate' && (
        <div className="celebrate-burst">
          <span className="big-cheer">{CHEER_MESSAGES[levelIdx % CHEER_MESSAGES.length]}</span>
          {[...Array(12)].map((_, i) => (
            <span key={i} className="confetti-piece" style={{
              left: `${5 + Math.random() * 90}%`,
              animationDelay: `${Math.random() * 0.5}s`,
              fontSize: `${1 + Math.random() * 1.5}rem`,
            }}>
              {['🎉', '⭐', '🎊', '✨', '💫', '🌟'][i % 6]}
            </span>
          ))}
        </div>
      )}

      <div className="game-progress-dots">
        {ROAD_LEVELS.map((_, i) => (
          <div key={i} className={`progress-dot ${i < levelIdx ? 'done' : ''} ${i === levelIdx ? 'current' : ''}`} />
        ))}
      </div>
    </div>
  );
};

// ────────────────────────────────────────────────
//  GAME 2: ANIMAL PARADE COUNTING
//  Animals walk across, kid taps each one
// ────────────────────────────────────────────────
const PARADE_LEVELS = [
  { animal: '🐥', name: 'chicks', count: 3, speed: 2.5 },
  { animal: '🐸', name: 'frogs', count: 4, speed: 2 },
  { animal: '🐛', name: 'caterpillars', count: 5, speed: 3 },
  { animal: '🐧', name: 'penguins', count: 3, speed: 1.8 },
  { animal: '🦋', name: 'butterflies', count: 6, speed: 2.2 },
];

const AnimalParadeGame = ({ onComplete }) => {
  const [levelIdx, setLevelIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [animals, setAnimals] = useState([]);
  const [tappedCount, setTappedCount] = useState(0);
  const [shoutText, setShoutText] = useState('');
  const [shoutKey, setShoutKey] = useState(0);
  const [phase, setPhase] = useState('parade'); // 'parade' | 'celebrate'
  const level = PARADE_LEVELS[levelIdx % PARADE_LEVELS.length];

  useEffect(() => {
    const newAnimals = [];
    for (let i = 0; i < level.count; i++) {
      newAnimals.push({
        id: i,
        emoji: level.animal,
        delay: i * 1.2,
        tapped: false,
        y: 30 + Math.random() * 40,
      });
    }
    setAnimals(newAnimals);
    setTappedCount(0);
    setShoutText('');
    setPhase('parade');
  }, [levelIdx]);

  const handleTapAnimal = (id) => {
    setAnimals(prev => {
      const updated = prev.map(a => {
        if (a.id === id && !a.tapped) {
          const newCount = tappedCount + 1;
          setTappedCount(newCount);
          setShoutText(NUMBER_WORDS[newCount] || `${newCount}!`);
          setShoutKey(k => k + 1);

          if (newCount === level.count) {
            setScore(s => s + 10);
            setPhase('celebrate');
            setTimeout(() => {
              if (levelIdx >= PARADE_LEVELS.length - 1) {
                onComplete(score + 10);
              } else {
                setLevelIdx(i => i + 1);
              }
            }, 1800);
          }
          return { ...a, tapped: true };
        }
        return a;
      });
      return updated;
    });
  };

  return (
    <div className="game-area parade-game">
      <div className="game-score">
        <Star size={18} fill="#fbbf24" color="#fbbf24" />
        <span>{score}</span>
      </div>

      <h2 className="game-question">
        Tap each {level.name} to count them! 👆
      </h2>

      <div className="parade-counter">
        <span className="counter-number">{tappedCount}</span>
        <span className="counter-label">/ {level.count}</span>
      </div>

      {/* Parade Field */}
      <div className="parade-field">
        <div className="grass-layer" />

        {animals.map((animal) => (
          <div
            key={animal.id}
            className={`parade-animal ${animal.tapped ? 'tapped' : ''}`}
            style={{
              '--walk-delay': `${animal.delay}s`,
              '--walk-speed': `${level.speed + level.count}s`,
              top: `${animal.y}%`,
            }}
            onClick={() => handleTapAnimal(animal.id)}
          >
            <span className="animal-emoji">{animal.emoji}</span>
            {animal.tapped && (
              <span className="tap-number">{animals.filter((a, i) => a.tapped && i <= animals.indexOf(animal)).length}</span>
            )}
          </div>
        ))}
      </div>

      {/* Shout Text */}
      {shoutText && (
        <div className="shout-container" key={shoutKey}>
          <span className="shout-text">{shoutText}</span>
        </div>
      )}

      {/* Celebrate */}
      {phase === 'celebrate' && (
        <div className="celebrate-burst">
          <span className="big-cheer">{CHEER_MESSAGES[levelIdx % CHEER_MESSAGES.length]}</span>
          {[...Array(10)].map((_, i) => (
            <span key={i} className="confetti-piece" style={{
              left: `${5 + Math.random() * 90}%`,
              animationDelay: `${Math.random() * 0.5}s`,
            }}>
              {['🎉', '⭐', '🎊', '✨'][i % 4]}
            </span>
          ))}
        </div>
      )}

      <div className="game-progress-dots">
        {PARADE_LEVELS.map((_, i) => (
          <div key={i} className={`progress-dot ${i < levelIdx ? 'done' : ''} ${i === levelIdx ? 'current' : ''}`} />
        ))}
      </div>
    </div>
  );
};

// ────────────────────────────────────────────────
//  GAME 3: BUBBLE POP MATH (enhanced)
// ────────────────────────────────────────────────
const BUBBLE_QUESTIONS = [
  { question: 'What is 1 + 1?', answer: 2, options: [1, 2, 3, 4] },
  { question: 'What is 2 + 1?', answer: 3, options: [2, 3, 4, 5] },
  { question: 'What is 3 + 2?', answer: 5, options: [4, 5, 6, 7] },
  { question: 'What is 2 + 2?', answer: 4, options: [2, 3, 4, 5] },
  { question: 'What is 5 - 2?', answer: 3, options: [1, 2, 3, 4] },
  { question: 'What is 3 + 3?', answer: 6, options: [4, 5, 6, 7] },
];

const BubblePopGame = ({ onComplete }) => {
  const [qIdx, setQIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState(null);
  const [popped, setPopped] = useState(null);
  const q = BUBBLE_QUESTIONS[qIdx % BUBBLE_QUESTIONS.length];

  const handlePop = (val, idx) => {
    if (feedback) return;
    setPopped(idx);
    if (val === q.answer) {
      setFeedback('correct');
      setScore(s => s + 10);
      setTimeout(() => {
        setPopped(null);
        setFeedback(null);
        if (qIdx >= 5) onComplete(score + 10);
        else setQIdx(i => i + 1);
      }, 1000);
    } else {
      setFeedback('wrong');
      setTimeout(() => { setPopped(null); setFeedback(null); }, 800);
    }
  };

  const bubbleColors = ['#3b82f6', '#ec4899', '#10b981', '#f59e0b'];

  return (
    <div className="game-area bubble-game">
      <div className="game-score">
        <Star size={18} fill="#fbbf24" color="#fbbf24" />
        <span>{score}</span>
      </div>
      <h2 className="game-question">{q.question}</h2>
      <div className="bubbles-container">
        {q.options.map((val, i) => (
          <button
            key={`${qIdx}-${i}`}
            className={`bubble ${popped === i ? (feedback === 'correct' ? 'pop-correct' : 'pop-wrong') : ''}`}
            style={{ '--bubble-color': bubbleColors[i], animationDelay: `${i * 0.15}s` }}
            onClick={() => handlePop(val, i)}
          >
            <span className="bubble-number">{val}</span>
          </button>
        ))}
      </div>
      {feedback === 'correct' && <div className="feedback-popup correct-popup"><span>🫧 POP! Correct! 🎉</span></div>}
      {feedback === 'wrong' && <div className="feedback-popup wrong-popup"><span>💨 Try again!</span></div>}
      <div className="game-progress-dots">
        {BUBBLE_QUESTIONS.slice(0, 6).map((_, i) => (
          <div key={i} className={`progress-dot ${i < qIdx ? 'done' : ''} ${i === qIdx ? 'current' : ''}`} />
        ))}
      </div>
    </div>
  );
};

// ────────────────────────────────────────────────
//  GAME 4: MEMORY MATCH (enhanced with flip animation)
// ────────────────────────────────────────────────
const MATCH_PAIRS = [
  { emoji: '🍎', name: 'Apple' }, { emoji: '🐱', name: 'Cat' },
  { emoji: '🌟', name: 'Star' }, { emoji: '🐶', name: 'Dog' },
  { emoji: '🌈', name: 'Rainbow' }, { emoji: '🎈', name: 'Balloon' },
];

const MemoryGame = ({ onComplete }) => {
  const [cards, setCards] = useState([]);
  const [flipped, setFlipped] = useState([]);
  const [matched, setMatched] = useState([]);
  const [moves, setMoves] = useState(0);
  const [score, setScore] = useState(0);
  const [shoutText, setShoutText] = useState('');
  const [shoutKey, setShoutKey] = useState(0);
  const lockRef = useRef(false);

  useEffect(() => {
    const pairs = MATCH_PAIRS.slice(0, 6);
    const deck = [...pairs, ...pairs]
      .sort(() => Math.random() - 0.5)
      .map((card, idx) => ({ ...card, id: idx }));
    setCards(deck);
  }, []);

  const handleFlip = (id) => {
    if (lockRef.current || flipped.includes(id) || matched.includes(id)) return;
    const newFlipped = [...flipped, id];
    setFlipped(newFlipped);
    if (newFlipped.length === 2) {
      lockRef.current = true;
      setMoves(m => m + 1);
      const [a, b] = newFlipped;
      if (cards[a].emoji === cards[b].emoji) {
        const newMatched = [...matched, a, b];
        setMatched(newMatched);
        setScore(s => s + 15);
        setShoutText('MATCH! 🎉');
        setShoutKey(k => k + 1);
        setFlipped([]);
        lockRef.current = false;
        if (newMatched.length === cards.length) setTimeout(() => onComplete(score + 15), 800);
      } else {
        setTimeout(() => { setFlipped([]); lockRef.current = false; }, 800);
      }
    }
  };

  return (
    <div className="game-area memory-game">
      <div className="game-score">
        <Star size={18} fill="#fbbf24" color="#fbbf24" />
        <span>{score}</span>
        <span className="moves-label">Moves: {moves}</span>
      </div>
      <h2 className="game-question">Find the matching pairs! 🧠</h2>
      {shoutText && <div className="shout-container" key={shoutKey}><span className="shout-text shout-small">{shoutText}</span></div>}
      <div className="memory-grid">
        {cards.map((card, i) => {
          const isFlipped = flipped.includes(i) || matched.includes(i);
          const isMatched = matched.includes(i);
          return (
            <div key={i} className={`memory-card ${isFlipped ? 'flipped' : ''} ${isMatched ? 'matched' : ''}`} onClick={() => handleFlip(i)}>
              <div className="card-inner">
                <div className="card-front">❓</div>
                <div className="card-back">{card.emoji}</div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

// ────────────────────────────────────────────────
//  COMPLETION SCREEN
// ────────────────────────────────────────────────
const CompletionScreen = ({ score, onReplay, onGoBack }) => (
  <div className="completion-screen">
    <div className="completion-content">
      <div className="trophy-bounce">🏆</div>
      <h1>Amazing Job!</h1>
      <p>You earned</p>
      <div className="final-score">
        <Star size={32} fill="#fbbf24" color="#fbbf24" />
        <span>{score} Stars</span>
      </div>
      <div className="stars-rain">
        {[...Array(8)].map((_, i) => (
          <span key={i} className="rain-star" style={{ animationDelay: `${i * 0.2}s`, left: `${10 + i * 11}%` }}>⭐</span>
        ))}
      </div>
      <div className="completion-buttons">
        <button className="replay-btn" onClick={onReplay}><RotateCcw size={18} /> Play Again</button>
        <button className="back-btn" onClick={onGoBack}><ArrowLeft size={18} /> Back to Games</button>
      </div>
    </div>
  </div>
);

// ────────────────────────────────────────────────
//  GAME TYPES
// ────────────────────────────────────────────────
const GAME_TYPES = [
  { id: 'road-trip', title: '🚗 Road Trip Count', description: 'A car drives by — count what you see!', color: '#10b981', bg: '#d1fae5' },
  { id: 'parade', title: '🐥 Animal Parade', description: 'Tap each animal to count them!', color: '#f59e0b', bg: '#fef3c7' },
  { id: 'bubble-pop', title: '🫧 Bubble Pop Math', description: 'Pop the right answer!', color: '#8b5cf6', bg: '#ede9fe' },
  { id: 'memory', title: '🧠 Memory Match', description: 'Find the matching pairs!', color: '#ec4899', bg: '#fce7f3' },
];

// ────────────────────────────────────────────────
//  MAIN COMPONENT
// ────────────────────────────────────────────────
const MiniGames = () => {
  const navigate = useNavigate();
  const [activeGame, setActiveGame] = useState(null);
  const [completed, setCompleted] = useState(false);
  const [finalScore, setFinalScore] = useState(0);

  const handleComplete = (score) => { setFinalScore(score); setCompleted(true); };
  const handleReplay = () => {
    setCompleted(false);
    const game = activeGame;
    setActiveGame(null);
    setTimeout(() => setActiveGame(game), 50);
  };
  const handleBack = () => { setActiveGame(null); setCompleted(false); setFinalScore(0); };

  if (completed) return (
    <div className="minigames-page animate-slide-up">
      <CompletionScreen score={finalScore} onReplay={handleReplay} onGoBack={handleBack} />
    </div>
  );

  if (activeGame) return (
    <div className="minigames-page animate-slide-up">
      <header className="games-header">
        <button className="back-link" onClick={handleBack}><ArrowLeft size={18} /> Back to Games</button>
      </header>
      {activeGame === 'road-trip' && <RoadTripGame onComplete={handleComplete} />}
      {activeGame === 'parade' && <AnimalParadeGame onComplete={handleComplete} />}
      {activeGame === 'bubble-pop' && <BubblePopGame onComplete={handleComplete} />}
      {activeGame === 'memory' && <MemoryGame onComplete={handleComplete} />}
    </div>
  );

  return (
    <div className="minigames-page animate-slide-up">
      <header className="games-header">
        <button className="back-link" onClick={() => navigate('/student')}><ArrowLeft size={18} /> Dashboard</button>
        <div className="games-title-area">
          <h1><span className="games-emoji">🎮</span> Fun Games</h1>
          <p>Pick a game and start learning while having fun!</p>
        </div>
      </header>
      <div className="game-cards-grid">
        {GAME_TYPES.map((game, i) => (
          <button
            key={game.id}
            className="game-select-card"
            style={{ '--card-color': game.color, '--card-bg': game.bg, animationDelay: `${i * 0.1}s` }}
            onClick={() => setActiveGame(game.id)}
          >
            <div className="game-card-icon">{game.title.split(' ')[0]}</div>
            <h3>{game.title.split(' ').slice(1).join(' ')}</h3>
            <p>{game.description}</p>
            <span className="play-label">▶ Play Now</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default MiniGames;
