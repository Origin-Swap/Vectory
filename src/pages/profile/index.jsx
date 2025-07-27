// 📁 src/pages/profile/index.jsx
import React from 'react';
import Topbar from '../../components/Menu/TopBar';
import ProfileDashboard from '../../components/profile/Portfolio';

const ProfilePage = () => {
  return (
    <div className="w-full">
    <div className="md:hidden block">
      <Topbar />
    </div>
      <ProfileDashboard />
    </div>
  );
};

export default ProfilePage;
