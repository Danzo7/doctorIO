import QueueItem from '@components/QueueItem';
import React from 'react';
import './index.scss';
interface AppSidebar {}

function AppSidebar({}: AppSidebar) {
  return (
    <div className="AppSidebar">
      <QueueItem name="hello" position={2}></QueueItem>
    </div>
  );
}

export default AppSidebar;
