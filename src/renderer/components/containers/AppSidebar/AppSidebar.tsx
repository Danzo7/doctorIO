import BookedList from '@components/booked_list';
import QueueList from '@components/queue_list';
import React from 'react';
import './index.scss';
interface AppSidebarProps {}

function AppSidebar({}: AppSidebarProps) {
  return (
    <div className="AppSidebar">
      <QueueList></QueueList>
      <BookedList></BookedList>
    </div>
  );
}

export default AppSidebar;
