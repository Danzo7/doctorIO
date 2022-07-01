/* eslint-disable no-unused-vars */
import QueueItem from '@components/appointments_queue/components/queue_item';
import { useState } from 'react';
import './style/index.scss';
import ScrollView from '@components/scroll_view';
import { useScroller } from '@libs/hooks/useScroller';
import QueueControls from '@components/queue_controls';
import { appointmentQueueData } from '@api/fake';
import { color } from '@assets/styles/color';
import TextButton from '@components/buttons/text_button';
import Backdrop from '@components/backdrop';
import Header from '@components/header';

interface AppointmentQueueSmallProps {}
const { appointments, state, isOwner } = appointmentQueueData; //REDUX getAppointmentQUeue
export default function AppointmentQueueSmall({}: AppointmentQueueSmallProps) {
  const [selected, setSelected] = useState(-1);
  const { ref, gotoFrom } = useScroller(10);
  function goToSelection(index: number) {
    if (selected > appointments.length - 1) return;
    gotoFrom(index, selected);
    setSelected(index);
  }
  return (
    <div className="appointment-queue-small">
      <Header
        title="Queue list"
        buttonNode={
          <QueueControls isOwner={isOwner} isPaused={state === 'paused'} />
        }
      />
      <div className="queue-items">
        {appointments.length > 0 ? (
          <Backdrop
            when={state === 'paused' ? (isOwner ? 'blur' : true) : false}
            backdropItems={
              <>
                <span css={{ fontSize: 14 }}>
                  Queue is paused
                  {!isOwner && (
                    <>
                      {' by'} <span css={{ fontWeight: 600 }}>The owner</span>
                    </>
                  )}
                </span>
                {isOwner && (
                  <TextButton
                    text="resume"
                    backgroundColor={color.good_green}
                    onPress={() => {
                      //REDUX change the state of queue
                    }}
                  />
                )}
              </>
            }
          >
            <ScrollView refs={ref} gap={10}>
              {appointments.map(
                (
                  { date, patientId, patientName, diagnosis, position },
                  index,
                ) => (
                  <div
                    key={patientId.toString() + index}
                    onClick={() => {
                      if (selected == index) setSelected(-1);
                      else goToSelection(index);
                    }}
                  >
                    <QueueItem
                      id={patientId}
                      name={patientName}
                      number={position}
                      timeAgo={date}
                      diagnosis={diagnosis}
                      opened={selected == index}
                    />
                  </div>
                ),
              )}
            </ScrollView>
          </Backdrop>
        ) : (
          <span>empty</span>
        )}
      </div>
    </div>
  );
}
