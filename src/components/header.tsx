import React, { useState } from 'react';
import { BellIcon, UserCircleIcon, DotsVerticalIcon } from '@heroicons/react/outline';

const Header: React.FC = () => {
  const [showNotifications, setShowNotifications] = useState(false);

  // Contoh dummy notifikasi
  const notifications = [
    { id: 1, message: 'Peserta baru terdaftar', time: '5 menit yang lalu' },
    { id: 2, message: 'Data peserta diperbarui', time: '10 menit yang lalu' },
    { id: 3, message: 'Ada 2 peserta yang lulus', time: '30 menit yang lalu' },
  ];

  return (
    <header className="header">
      <div className="header-left">
        {/* Empty space / Logo bisa ditaruh di sini */}
      </div>

      <div className="header-right">
        {/* Icon Bell */}
        <div className="relative">
          <BellIcon
            className="header-icon cursor-pointer"
            onClick={() => setShowNotifications(!showNotifications)}
          />
          
          {/* Badge jumlah notifikasi */}
          <span className="notification-badge">{notifications.length}</span>

          {/* Dropdown Notifikasi */}
          {showNotifications && (
            <div className="notification-dropdown">
              <h3>Notifikasi</h3>
              <ul>
                {notifications.map((notif) => (
                  <li key={notif.id}>
                    <p className="notif-message">{notif.message}</p>
                    <span className="notif-time">{notif.time}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* User Info */}
        <div className="user-info">
          <UserCircleIcon className="user-avatar" />
          <span>Telkom University</span>
        </div>

        {/* Dots Menu */}
        <DotsVerticalIcon className="header-icon" />
      </div>
    </header>
  );
};

export default Header;
