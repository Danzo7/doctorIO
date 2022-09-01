import BookedList from '@components/booked_list';
import AppointmentQueueSmall from '@components/appointments_queue/appointment_queue_small';
import { useState } from 'react';
import Arrow from 'toSvg/arrow.svg?icon';
import { Transition } from 'react-transition-group';
import './index.scss';
import SearchProfile from '@components/search_profile';
import { currentMember } from '@api/fake';

interface AppSidebarProps {}
//REDUX currentMember

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
                  <SearchProfile
                    avatar={currentMember.avatar}
                    alt={currentMember.name + currentMember.id}
                  />
                  <AppointmentQueueSmall></AppointmentQueueSmall>
                  <BookedList />
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
