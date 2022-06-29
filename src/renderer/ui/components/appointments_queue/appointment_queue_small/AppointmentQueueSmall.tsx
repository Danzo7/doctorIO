/* eslint-disable no-unused-vars */
import QueueItem from '@components/appointments_queue/components/queue_item';
import { useState } from 'react';
import './style/index.scss';
import ScrollView from '@components/scroll_view';

import { useScroller } from '@libs/hooks/useScroller';
import QueueControls from '@components/queue_controls';
import { appointmentQueueData } from '@api/fake';

interface AppointmentQueueSmallProps {}
const { appointments } = appointmentQueueData;
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
          role={{
            roleName: 'owner',
            roleProps: {
              onCallNext: () => {
                // setItems(appointments.slice(1, appointments.length));
                setSelected(-1);
                gotoFrom(0, selected);
              },
            },
          }}
        />
      </div>
      <div className="queue-items">
        {appointments.length > 0 ? (
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
        ) : (
          <span>nothing...</span>
        )}
      </div>
    </div>
  );
}
