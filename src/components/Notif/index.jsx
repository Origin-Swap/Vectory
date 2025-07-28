import React, { useState } from 'react';

// Data mock notifikasi
const mockNotifications = [
  {
    id: 1,
    title: 'Welcome to BullPad!',
    description: 'Thank you for joining our platform. Explore and earn now!',
    date: '2025-07-27',
    read: false,
  },
  {
    id: 2,
    title: 'Claim your daily reward!',
    description: 'You can now claim your daily token reward.',
    date: '2025-07-26',
    read: false,
  },
  {
    id: 3,
    title: 'Farming reward available',
    description: 'Your farming rewards are now available to claim.',
    date: '2025-07-25',
    read: true,
  },
];

const TabPage = () => {
  const [activeTab, setActiveTab] = useState('new');

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const filteredNotifications = mockNotifications.filter((notif) =>
    activeTab === 'new' ? !notif.read : notif.read
  );

  return (
    <div className="w-full px-4 py-3">
      <div className="flex justify-center space-x-4 border-b border-gray-200 pb-4">
        <button
          onClick={() => handleTabClick('new')}
          className={`text-sm font-semibold py-2 px-4 rounded-t-lg transition-colors duration-300 ${
            activeTab === 'new'
              ? 'text-blue-600 border-b-2 border-blue-600'
              : 'text-gray-500'
          }`}
        >
          New
        </button>
        <button
          onClick={() => handleTabClick('read')}
          className={`text-sm font-semibold py-2 px-4 rounded-t-lg transition-colors duration-300 ${
            activeTab === 'read'
              ? 'text-blue-600 border-b-2 border-blue-600'
              : 'text-gray-500'
          }`}
        >
          Read
        </button>
      </div>

      <div className="mt-6 space-y-4">
        {filteredNotifications.length === 0 ? (
          <div className="text-center text-gray-500">No notifications</div>
        ) : (
          filteredNotifications.map((notif) => (
            <div
              key={notif.id}
              className="bg-white shadow rounded-lg p-4 border border-gray-100"
            >
              <h3 className="text-md font-bold text-gray-800">{notif.title}</h3>
              <p className="text-sm text-gray-600 mt-1">{notif.description}</p>
              <p className="text-xs text-gray-400 mt-2">{notif.date}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default TabPage;
