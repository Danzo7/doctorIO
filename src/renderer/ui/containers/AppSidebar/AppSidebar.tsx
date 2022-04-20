import BookedList from '@components/booked_list';
import QueueList from '@components/queue_list';
import React, { useState } from 'react';
import Arrow from 'toSvg/arrow.svg?icon';
import { Transition } from 'react-transition-group';
import './index.scss';
interface AppSidebarProps {}

function AppSidebar({}: AppSidebarProps) {
  const [isMini, setMini] = useState(false);
  return (
    <Transition in={!isMini} timeout={200}>
      {(state) => {
        return (
          <div className={`AppSidebar${isMini ? ' minimize' : ''}`}>
            {state != 'exited' && (
              <div className="sidebar">
                <div className={`content ${state}`}>
                  <QueueList></QueueList>
                  <BookedList></BookedList>
                </div>
              </div>
            )}
            <div className="control" onClick={() => setMini(!isMini)}>
              <Arrow width={10} height={10} />
            </div>
          </div>
        );
      }}
    </Transition>
  );
}

export default AppSidebar;
