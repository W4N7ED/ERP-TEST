
import React from 'react';
import DisplayPreferencesCard from './display/DisplayPreferencesCard';
import NotificationsCard from './notifications/NotificationsCard';

const ProfileDisplay: React.FC = () => {
  return (
    <div className="space-y-6">
      <DisplayPreferencesCard />
      <NotificationsCard />
    </div>
  );
};

export default ProfileDisplay;
