import React from 'react';
import { BellIcon, UserCircleIcon, DotsVerticalIcon } from '@heroicons/react/outline';

const Header: React.FC = () => {
  return (
    <header className="header">
      <div className="header-left">
        {/* Empty space */}
      </div>
      <div className="header-right">
        <BellIcon className="header-icon" />
        <div className="user-info">
          <UserCircleIcon className="user-avatar" />
          <span>Telkom University</span>
        </div>
        <DotsVerticalIcon className="header-icon" />
      </div>
    </header>
  );
};

export default Header;
