import BookedList from '@components/booked_list';
import AppointmentQueueSmall from '@components/appointments_queue/appointment_queue_small';
import { useState } from 'react';
import Arrow from 'toSvg/arrow.svg?icon';
import { Transition } from 'react-transition-group';
import './index.scss';
import SearchProfile from '@components/search_profile';
import { BookedAppointment } from '@models/instance.model';
import { currentMember } from '@api/fake';

interface AppSidebarProps {}
//todo redux
const BookedAppointmentList: BookedAppointment[] = [
  {
    bookTime: new Date('2022-5-10'),
    patientId: 1,
    id: 1,
    patientName: 'John doe',
    state: 'in queue',
  },
  {
    bookTime: new Date('2022-9-10'),
    patientId: 2,
    id: 2,
    patientName: 'karl john',
    state: 'panding',
  },
  {
    bookTime: new Date('2022-5-10'),
    patientId: 3,
    id: 3,
    patientName: 'John doe',
    state: 'in queue',
  },
  {
    bookTime: new Date('2022-5-10'),
    patientId: 4,
    id: 4,
    patientName: 'John doe',
    state: 'in queue',
  },
];

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
                  <SearchProfile avatar={currentMember.avatar} />
                  <AppointmentQueueSmall></AppointmentQueueSmall>
                  <BookedList list={BookedAppointmentList} />
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
