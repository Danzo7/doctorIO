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

interface AppointmentQueueSmallProps {}
const { appointments, state, roleId } = appointmentQueueData;
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
      <div className="header">
        <span>Appointment</span>

        <QueueControls
          isOwner={
            true //todo:roleId is in currentMemberRoles
          }
          isPaused={state === 'paused'}
        />
      </div>
      <div className="queue-items">
        {appointments.length > 0 ? (
          <Backdrop
            when={state == 'paused' ? 'blur' : undefined} //todo:choose between blur and true and fix backdropItemContent
            backdropItems={
              <>
                <span>queue is paused</span>
                <TextButton text="resume" backgroundColor={color.good_green} />
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
          <span>nothing...</span>
        )}
      </div>
    </div>
  );
}
