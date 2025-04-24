import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  HomeIcon, 
  UserGroupIcon, 
  AcademicCapIcon, 
  BookOpenIcon, 
  CashIcon 
} from '@heroicons/react/outline';

const Sidebar: React.FC = () => {
  return (
    <div className="sidebar">
      <div className="logo-container">
        <img src="../assets/images/logo3-e1511767184374 1.png" alt="Telkom University" className="logo" />
      </div>
      
      <nav className="nav-menu">
        <NavLink to="/" className={({ isActive }) => isActive ? 'nav-item active' : 'nav-item'}>
          <HomeIcon className="nav-icon" />
          <span>Dashboard</span>
        </NavLink>
        
        <NavLink to="/peserta" className={({ isActive }) => isActive ? 'nav-item active' : 'nav-item'}>
          <UserGroupIcon className="nav-icon" />
          <span>Peserta</span>
        </NavLink>
        
        <NavLink to="/dosen" className={({ isActive }) => isActive ? 'nav-item active' : 'nav-item'}>
          <AcademicCapIcon className="nav-icon" />
          <span>Dosen</span>
        </NavLink>
        
        <NavLink to="/mata-kuliah" className={({ isActive }) => isActive ? 'nav-item active' : 'nav-item'}>
          <BookOpenIcon className="nav-icon" />
          <span>Mata Kuliah</span>
        </NavLink>
        
        <NavLink to="/transaksi" className={({ isActive }) => isActive ? 'nav-item active' : 'nav-item'}>
          <CashIcon className="nav-icon" />
          <span>Transaksi</span>
        </NavLink>
      </nav>
      
      <div className="sidebar-footer">
        {/* Additional sidebar footer content if needed */}
      </div>
    </div>
  );
};

export default Sidebar;