import QueueItem from '@components/QueueItem';
import React from 'react';
import './index.scss';
interface AppSidebarProps {}

function AppSidebar({}: AppSidebarProps) {
  return (
    <div className="AppSidebar">
      <QueueItem name="hello" position={2}></QueueItem>
    </div>
  );
}

export default AppSidebar;
