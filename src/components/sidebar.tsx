import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import {
  HomeIcon,
  UserGroupIcon,
  AcademicCapIcon,
  BookOpenIcon,
  CashIcon,
  ChevronDownIcon,
  MenuIcon
} from '@heroicons/react/outline';

const Sidebar: React.FC = () => {
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [collapsed, setCollapsed] = useState(false);

  const toggleMenu = (menuName: string) => {
    setOpenMenu((prev) => (prev === menuName ? null : menuName));
  };

  return (
    <div className={`sidebar ${collapsed ? 'collapsed' : ''}`}>
      {/* Collapse Button */}
      <div className="collapse-button" onClick={() => setCollapsed(!collapsed)}>
        <MenuIcon className="menu-toggle-icon" />
      </div>

      <div className="logo-container">
        {!collapsed && (
          <img src="../assets/images/ide.png" alt="Telkom University" className="logo" />
        )}
      </div>

      <nav className="nav-menu">
        {/* Dashboard */}
        <NavLink to="/dashboard" className={({ isActive }) => isActive ? 'nav-item active' : 'nav-item'}>
          <HomeIcon className="nav-icon" />
          {!collapsed && <span>Dashboard</span>}
        </NavLink>

        {/* Peserta with Submenu */}
        <div className="nav-item-with-submenu">
          <div className="nav-item" onClick={() => toggleMenu('peserta')}>
            <UserGroupIcon className="nav-icon" />
            {!collapsed && (
              <>
                <span>Peserta</span>
                <ChevronDownIcon className={`chevron-icon ${openMenu === 'peserta' ? 'rotate' : ''}`} />
              </>
            )}
          </div>
          {openMenu === 'peserta' && !collapsed && (
            <div className="submenu">
              <NavLink to="/peserta" className={({ isActive }) => isActive ? 'submenu-item active' : 'submenu-item'}>
                Daftar Peserta
              </NavLink>
              <NavLink to="/outbound" className={({ isActive }) => isActive ? 'submenu-item active' : 'submenu-item'}>
                Outbound
              </NavLink>
            </div>
          )}
        </div>

        {/* Dosen */}
        <NavLink to="/dosen" className={({ isActive }) => isActive ? 'nav-item active' : 'nav-item'}>
          <AcademicCapIcon className="nav-icon" />
          {!collapsed && <span>Dosen</span>}
        </NavLink>

        {/* Mata Kuliah */}
        <NavLink to="/mata-kuliah" className={({ isActive }) => isActive ? 'nav-item active' : 'nav-item'}>
          <BookOpenIcon className="nav-icon" />
          {!collapsed && <span>Mata Kuliah</span>}
        </NavLink>

        {/* Transaksi */}
        <NavLink to="/transaksi" className={({ isActive }) => isActive ? 'nav-item active' : 'nav-item'}>
          <CashIcon className="nav-icon" />
          {!collapsed && <span>Transaksi</span>}
        </NavLink>
      </nav>

      <div className="sidebar-footer">
        {/* Footer Content */}
      </div>
    </div>
  );
};

export default Sidebar;
