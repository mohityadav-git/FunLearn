import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import StudentDashboard from './pages/StudentDashboard';
import InteractiveExam from './pages/InteractiveExam';
import ExamResults from './pages/ExamResults';
import LandingPage from './pages/LandingPage';
import GuestSubjectPage from './pages/GuestSubjectPage';
import LoginModal from './components/LoginModal';
import TeacherDashboard from './pages/TeacherDashboard';
import CreateExam from './pages/CreateExam';
import ManageQuestions from './pages/ManageQuestions';
import QuestionBank from './pages/QuestionBank';
import InteractiveQuestion from './pages/InteractiveQuestion';
import ThemeToggle from './components/ThemeToggle';
import Button from './components/Button';
import SidebarLeft from './components/SidebarLeft';
import SidebarRight from './components/SidebarRight';
import SubjectHub from './pages/SubjectHub';
import StudyPlan from './pages/StudyPlan';
import Explore from './pages/Explore';
import SubjectQuest from './pages/SubjectQuest';
import Practice from './pages/Practice';
import Achievements from './pages/Achievements';
import Settings from './pages/Settings';
import LessonReader from './pages/LessonReader';
import ManageLessons from './pages/ManageLessons';
import RoadmapTest from './pages/RoadmapTest';
import { LESSON_CONTENT } from './data/lessonContent';
import { LIBRARY_DATA } from './data/subjectContent';
import StudentChatbot from './components/StudentChatbot';
import { useLocation, useNavigate } from 'react-router-dom';

const MOCK_QUESTIONS = [
  {
    id: 1,
    text: "What is 7 × 8?",
    options: ["54", "56", "62", "48"],
    correctAnswer: 1,
    hint: "Think of 5, 6, 7, 8... 56 = 7 × 8!"
  },
  {
    id: 2,
    text: "If you have 3 apples and buy 5 more, how many do you have?",
    options: ["6", "7", "8", "9"],
    correctAnswer: 2,
    hint: "Just add 3 + 5."
  },
  {
    id: 3,
    text: "What is half of 100?",
    options: ["25", "40", "50", "60"],
    correctAnswer: 2,
    hint: "Divide 100 by 2."
  }
];

const INITIAL_EXAMS = [
  {
    id: "math-fun",
    title: "Math Fundamentals",
    subject: "Mathematics",
    color: "var(--primary)",
    icon: "📐",
    questions: MOCK_QUESTIONS,
    reward: 300
  },
  {
    id: "science-space",
    title: "Solar System Explorer",
    subject: "Science",
    color: "var(--warning)",
    icon: "🚀",
    questions: MOCK_QUESTIONS,
    reward: 300
  },
  {
    id: "english-grammar",
    title: "Grammar Heroes",
    subject: "English",
    color: "var(--secondary)",
    icon: "📚",
    questions: MOCK_QUESTIONS,
    reward: 300
  }
];

const INITIAL_BANK = [
  // 1. Mathematics
  { id: "qb-1", text: "What is 7 × 8?", options: ["54", "56", "62", "48"], correctAnswer: 1, hint: "Think of 5, 6, 7, 8... 56 = 7 × 8!", subject: "Mathematics", topic: "Number & Arithmetic", difficulty: "Easy" },
  { id: "qb-2", text: "Solve for x: 2x + 4 = 10", options: ["2", "3", "4", "6"], correctAnswer: 1, hint: "Subtract 4 from both sides, then divide by 2.", subject: "Mathematics", topic: "Algebra", difficulty: "Medium" },
  { id: "qb-3", text: "What is the area of a rectangle with length 5cm and width 8cm?", options: ["13 cm²", "26 cm²", "40 cm²", "45 cm²"], correctAnswer: 2, hint: "Area = length × width.", subject: "Mathematics", topic: "Geometry", difficulty: "Medium" },

  // 2. English
  { id: "qb-27", text: "Identify the noun in this sentence: 'The swift fox quickly jumped over the fence.'", options: ["Swift", "Fox", "Quickly", "Jumped"], correctAnswer: 1, hint: "A noun is a person, place, or thing.", subject: "English", topic: "Grammar", difficulty: "Easy" },
  { id: "qb-29", text: "Which is the correct spelling?", options: ["Occomodate", "Acomodate", "Accommodate", "Accomodate"], correctAnswer: 2, hint: "Two c's, two m's.", subject: "English", topic: "Vocabulary", difficulty: "Hard" },

  // 3. Verbal Reasoning
  { id: "vr-1", text: "Which word means the same as 'Large'?", options: ["Small", "Tiny", "Huge", "Thin"], correctAnswer: 2, hint: "Think of something very big.", subject: "Verbal Reasoning", topic: "Synonyms", difficulty: "Easy" },
  { id: "vr-2", text: "Find the missing letter to complete both words: PAN ( ) AND", options: ["D", "T", "G", "S"], correctAnswer: 0, hint: "PAND and DAND? No, think of PAND... wait, PANDA and DAND.", subject: "Verbal Reasoning", topic: "Word Completion", difficulty: "Medium" },

  // 4. Spatial Reasoning
  { id: "sr-1", text: "How many lines of symmetry does a square have?", options: ["2", "4", "6", "8"], correctAnswer: 1, hint: "Horizontal, vertical, and both diagonals.", subject: "Spatial Reasoning", topic: "Symmetry", difficulty: "Easy" },
  { id: "sr-2", text: "Which shape is a rotation of the target shape?", options: ["Shape A", "Shape B", "Shape C", "Shape D"], correctAnswer: 1, hint: "Try rotating the image in your mind.", subject: "Spatial Reasoning", topic: "Rotations", difficulty: "Hard" }
];

const AppContent = ({ stars, questionBank, solvedQuestions, availableExams, handleTestComplete, handleQuestionSolved, handleAddExam, handleUpdateQuestions, handleSyncToBank, handleUpdateBank, lessonsByClass, handleUpdateLessons, libraryByClass, handleUpdateLibrary, currentUser, handleLogin, handleLogout, roadmapProgress, handleUpdateRoadmapProgress }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const isStudentPortal = location.pathname.startsWith('/student');
  const isExamMode = location.pathname.startsWith('/exam/') || location.pathname.startsWith('/solve/');
  const isLibraryMode = location.pathname.includes('/library');
  const isGuestRoute = location.pathname === '/' || location.pathname.startsWith('/guest');
  
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  const onLogoutClick = () => {
    handleLogout();
    navigate('/');
  };

  return (
    <div className={`app-container ${isStudentPortal && !isExamMode ? 'with-sidebars' : ''}`}>
      {!isGuestRoute && (
        <header className="app-header">
          <div className="logo" style={{ cursor: 'pointer' }} onClick={() => window.location.href = '/'}>
            <span className="logo-icon">🚀</span> FunLearn
          </div>
          <div className="user-profile" style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <ThemeToggle />
            {currentUser && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span style={{ fontWeight: 'bold', color: 'var(--text-dark)' }}>
                  {currentUser.role === 'student' ? `${currentUser.name} (${currentUser.classLevel})` : 'Teacher'}
                </span>
                <Button variant="outline" size="sm" onClick={onLogoutClick} style={{ color: 'var(--text-dark)', borderColor: 'rgba(0,0,0,0.2)' }}>Logout</Button>
              </div>
            )}
            <div className="avatar">😊</div>
          </div>
        </header>
      )}

      <LoginModal 
        isOpen={isLoginModalOpen} 
        onClose={() => setIsLoginModalOpen(false)} 
        onLogin={handleLogin} 
      />

      {isStudentPortal && !isExamMode && !isLibraryMode && <SidebarLeft />}

      <div className={isGuestRoute ? "guest-layout-row" : "layout-row"}>
        <main className="main-content">
          <Routes>
            <Route path="/" element={<LandingPage onOpenLogin={() => setIsLoginModalOpen(true)} />} />
            <Route path="/guest/subject/:subjectName" element={<GuestSubjectPage onOpenLogin={() => setIsLoginModalOpen(true)} />} />
            <Route 
              path="/student" 
              element={<StudentDashboard stars={stars} bank={questionBank} solvedQuestions={solvedQuestions} exams={availableExams} libraryByClass={libraryByClass} currentUser={currentUser} />} 
            />
            <Route 
              path="/student/subject/:subjectName" 
              element={<SubjectHub />} 
            />
            <Route 
              path="/student/subject/:subjectName/library" 
              element={<LessonReader lessonsByClass={lessonsByClass} libraryByClass={libraryByClass} currentUser={currentUser} />} 
            />
            <Route 
              path="/student/subject/:subjectName/library/:topicId" 
              element={<LessonReader lessonsByClass={lessonsByClass} libraryByClass={libraryByClass} currentUser={currentUser} />} 
            />
            <Route 
              path="/student/subject/:subjectName/study-plan" 
              element={<StudyPlan libraryByClass={libraryByClass} roadmapProgress={roadmapProgress} currentUser={currentUser} />} 
            />
            <Route 
              path="/student/subject/:subjectName/roadmap-test/:topicId/:level/:testNum" 
              element={<RoadmapTest bank={questionBank} onComplete={handleUpdateRoadmapProgress} />} 
            />
            <Route 
              path="/student/subject/:subjectName/explore" 
              element={<Explore />} 
            />
            <Route 
              path="/student/subject/:subjectName/read/:topicId" 
              element={<LessonReader lessonsByClass={lessonsByClass} libraryByClass={libraryByClass} currentUser={currentUser} onReadComplete={handleUpdateRoadmapProgress} />} 
            />
             <Route 
              path="/student/subject/:subjectName/quest" 
              element={<SubjectQuest />} 
            />
             <Route 
              path="/student/practice" 
              element={<Practice bank={questionBank} solvedQuestions={solvedQuestions} />} 
            />
            <Route path="/student/achievements" element={<Achievements stars={stars} solvedQuestions={solvedQuestions} bank={questionBank} />} />
            <Route path="/student/settings" element={<Settings />} />
            <Route 
              path="/solve/:questionId" 
              element={<InteractiveQuestion bank={questionBank} onSolve={handleQuestionSolved} />} 
            />
            <Route 
              path="/teacher" 
              element={<TeacherDashboard exams={availableExams} />} 
            />
            <Route 
              path="/teacher/create" 
              element={<CreateExam onAddExam={handleAddExam} />} 
            />
            <Route 
              path="/teacher/exam/:examId/questions" 
              element={<ManageQuestions exams={availableExams} onUpdateQuestions={handleUpdateQuestions} bank={questionBank} onSyncBank={handleSyncToBank} />} 
            />
            <Route 
              path="/teacher/bank" 
              element={<QuestionBank bank={questionBank} onUpdateBank={handleUpdateBank} libraryByClass={libraryByClass} />} 
            />
            <Route 
              path="/teacher/lessons" 
              element={<ManageLessons lessonsByClass={lessonsByClass} onUpdateLessons={handleUpdateLessons} libraryByClass={libraryByClass} onUpdateLibrary={handleUpdateLibrary} />} 
            />
            <Route 
              path="/exam/:examId" 
              element={<InteractiveExam exams={availableExams} onComplete={handleTestComplete} />} 
            />
            <Route 
              path="/results" 
              element={<ExamResults />} 
            />
          </Routes>
        </main>

        {isStudentPortal && <StudentChatbot currentUser={currentUser} />}
      </div>
    </div>
  );
};

const App = () => {
  const [stars, setStars] = useState(0);
  const [availableExams, setAvailableExams] = useState(INITIAL_EXAMS);
  const [questionBank, setQuestionBank] = useState(INITIAL_BANK);
  const [solvedQuestions, setSolvedQuestions] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  
  // Roadmap Progression State
  // { classLevel: { subjectName: { topicId: { Foundation: { read: false, test1: false, test2: false, test3: false }, Intermediate: {...}, Advanced: {...} } } } }
  const [roadmapProgress, setRoadmapProgress] = useState({});

  const handleUpdateRoadmapProgress = (classLevel, subjectName, topicId, level, taskType) => {
    setRoadmapProgress(prev => {
      const classData = prev[classLevel] || {};
      const subjectData = classData[subjectName] || {};
      const topicData = subjectData[topicId] || {
        Foundation: { read: false, test1: false, test2: false, test3: false },
        Intermediate: { read: false, test1: false, test2: false, test3: false },
        Advanced: { read: false, test1: false, test2: false, test3: false }
      };
      const levelData = topicData[level] || { read: false, test1: false, test2: false, test3: false };

      return {
        ...prev,
        [classLevel]: {
          ...classData,
          [subjectName]: {
            ...subjectData,
            [topicId]: {
              ...topicData,
              [level]: {
                ...levelData,
                [taskType]: true
              }
            }
          }
        }
      };
    });
  };
  
  // Initialize lessons for 5 classes
  const [lessonsByClass, setLessonsByClass] = useState({
    "Class 1": LESSON_CONTENT,
    "Class 2": LESSON_CONTENT,
    "Class 3": LESSON_CONTENT,
    "Class 4": LESSON_CONTENT,
    "Class 5": LESSON_CONTENT
  });

  const [libraryByClass, setLibraryByClass] = useState({
    "Class 1": LIBRARY_DATA,
    "Class 2": LIBRARY_DATA,
    "Class 3": LIBRARY_DATA,
    "Class 4": LIBRARY_DATA,
    "Class 5": LIBRARY_DATA
  });

  const handleUpdateLibrary = (classLevel, newLibrary) => {
    setLibraryByClass(prev => ({
      ...prev,
      [classLevel]: newLibrary
    }));
  };

  const handleLogin = (user) => {
    setCurrentUser(user);
  };

  const handleLogout = () => {
    setCurrentUser(null);
  };

  const handleUpdateLessons = (classLevel, newLessons) => {
    setLessonsByClass(prev => ({
      ...prev,
      [classLevel]: newLessons
    }));
  };

  const handleTestComplete = (examId, earnedStars) => {
    setStars((prev) => prev + earnedStars);
    setAvailableExams((prev) => prev.filter((exam) => exam.id !== examId));
  };

  const handleQuestionSolved = (questionId, earnedStars) => {
    setSolvedQuestions((prev) => {
      if (!prev.includes(questionId)) {
        setStars((s) => s + earnedStars);
        return [...prev, questionId];
      }
      return prev;
    });
  };

  const handleAddExam = (newExam) => {
    setAvailableExams(prev => [...prev, newExam]);
  };

  const handleUpdateQuestions = (examId, newQuestions) => {
    setAvailableExams(prev => prev.map(exam => 
      exam.id === examId ? { ...exam, questions: newQuestions } : exam
    ));
  };

  const handleSyncToBank = (newQuestions, subject, topic, subtopic) => {
    setQuestionBank(prevBank => {
      let updatedBank = [...prevBank];
      newQuestions.forEach(q => {
        const existingIndex = updatedBank.findIndex(bq => bq.id === q.id);
        if (existingIndex >= 0) {
          updatedBank[existingIndex] = { ...q, subject, topic, subtopic };
        } else {
          updatedBank.push({ ...q, subject, topic, subtopic });
        }
      });
      return updatedBank;
    });
  };

  const handleUpdateBank = (newBank) => {
    setQuestionBank(newBank);
  };

  return (
    <Router>
      <AppContent 
        stars={stars} 
        questionBank={questionBank} 
        solvedQuestions={solvedQuestions} 
        availableExams={availableExams} 
        handleTestComplete={handleTestComplete} 
        handleQuestionSolved={handleQuestionSolved} 
        handleAddExam={handleAddExam} 
        handleUpdateQuestions={handleUpdateQuestions} 
        handleSyncToBank={handleSyncToBank} 
        handleUpdateBank={handleUpdateBank} 
        lessonsByClass={lessonsByClass}
        handleUpdateLessons={handleUpdateLessons}
        libraryByClass={libraryByClass}
        handleUpdateLibrary={handleUpdateLibrary}
        currentUser={currentUser}
        handleLogin={handleLogin}
        handleLogout={handleLogout}
        roadmapProgress={roadmapProgress}
        handleUpdateRoadmapProgress={handleUpdateRoadmapProgress}
      />
    </Router>
  );
};

export default App;
