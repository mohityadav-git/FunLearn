import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, BookOpen, Trophy, Settings } from 'lucide-react';
import './SidebarLeft.css';

const SidebarLeft = () => {
  const navItems = [
    { name: 'Dashboard', icon: <LayoutDashboard size={18} />, path: '/student', exact: true },
    { name: 'Practise', icon: <BookOpen size={18} />, path: '/student/practice' },
    { name: 'Achievements', icon: <Trophy size={18} />, path: '/student/achievements' },
    { name: 'Settings', icon: <Settings size={18} />, path: '/student/settings' },
  ];

  return (
    <div className="student-subnav" style={{ position: 'sticky', top: '76px', width: '100%', zIndex: 40 }}>
      {navItems.map((item) => (
        <NavLink 
          key={item.name} 
          to={item.path}
          end={item.exact}
          className={({ isActive }) => `subnav-link ${isActive ? 'active' : ''}`}
        >
          {item.icon}
          <span>{item.name.toUpperCase()}</span>
        </NavLink>
      ))}
    </div>
  );
};

export default SidebarLeft;
