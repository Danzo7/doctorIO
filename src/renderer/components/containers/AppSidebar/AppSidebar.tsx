import BookedList from '@components/booked_list';
import QueueList from '@components/queue_list';
import React, { useState } from 'react';
import Arrow from 'toSvg/arrow.svg?icon';
import './index.scss';
interface AppSidebarProps {}

function AppSidebar({}: AppSidebarProps) {
  const [isMini, setMini] = useState(false);
  return (
    <div className={`AppSidebar${isMini ? ' minimize' : ''}`}>
      <div className="sidebar">
        <div className="content">
          <QueueList></QueueList>
          <BookedList></BookedList>
        </div>
      </div>
      <div className="control" onClick={() => setMini(!isMini)}>
        <Arrow width={10} height={10} />
      </div>
    </div>
  );
}

export default AppSidebar;
