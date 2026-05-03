import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { LayoutDashboard, BookOpen, Trophy, Settings, GraduationCap, LogOut, Gamepad2 } from 'lucide-react';
import './SidebarLeft.css';

const SidebarLeft = () => {
  const navigate = useNavigate();

  const navItems = [
    { name: 'Dashboard', icon: <LayoutDashboard size={20} />, path: '/student' },
    { name: 'Practise', icon: <BookOpen size={20} />, path: '/student/practice' },
    { name: 'Fun Games', icon: <Gamepad2 size={20} />, path: '/student/games' },
    { name: 'Achievements', icon: <Trophy size={20} />, path: '/student/achievements' },
    { name: 'Settings', icon: <Settings size={20} />, path: '/student/settings' },
  ];

  return (
    <aside className="sidebar-left card-panel animate-slide-up">
      <div className="sidebar-header">
        <div className="sidebar-logo">
          <GraduationCap size={28} color="var(--primary)" />
          <span>Student Portal</span>
        </div>
      </div>
      
      <nav className="sidebar-nav">
        {navItems.map((item) => (
          <NavLink 
            key={item.name} 
            to={item.path}
            className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
          >
            <span className="nav-icon">{item.icon}</span>
            <span className="nav-label">{item.name}</span>
          </NavLink>
        ))}
      </nav>

      <div className="sidebar-footer">
        <button className="logout-btn" onClick={() => navigate('/')}>
          <LogOut size={18} />
          <span>Logout</span>
        </button>
        <div className="upgrade-card">
          <p>Want more quests?</p>
          <button className="upgrade-btn">Go Premium</button>
        </div>
      </div>
    </aside>
  );
};

export default SidebarLeft;
