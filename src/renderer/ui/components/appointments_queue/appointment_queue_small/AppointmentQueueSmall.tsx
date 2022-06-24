/* eslint-disable no-unused-vars */
import QueueItem from '@components/appointments_queue/components/queue_item';
import { useState } from 'react';
import './style/index.scss';
import ScrollView from '@components/scroll_view';

import { useScroller } from '@libs/hooks/useScroller';
import QueueControls from '@components/queue_controls';
import { subDays } from 'date-fns';

interface AppointmentQueueSmallProps {}
const itemsL = [
  { id: 1, name: 'adam smith', timeAgo: subDays(new Date(), 3), number: 20 },
  { id: 2, name: 'adam smith', timeAgo: subDays(new Date(), 3), number: 21 },
  { id: 3, name: 'adam smith', timeAgo: subDays(new Date(), 3), number: 22 },
  { id: 4, name: 'adam smith', timeAgo: subDays(new Date(), 2), number: 23 },
  { id: 5, name: 'adam smith', timeAgo: subDays(new Date(), 1), number: 24 },
];
export default function AppointmentQueueSmall({}: AppointmentQueueSmallProps) {
  const [selected, setSelected] = useState(-1);
  const [items, setItems] = useState(itemsL);
  const { ref, gotoFrom } = useScroller(10);
  function goToSelection(index: number) {
    if (selected > items.length - 1) return;
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
                setItems(items.slice(1, items.length));
                setSelected(-1);
                gotoFrom(0, selected);
              },
            },
          }}
        />
      </div>
      <div className="queue-items">
        {items.length > 0 ? (
          <ScrollView refs={ref} gap={10}>
            {items.map(({ id, name, timeAgo, number }, index) => (
              <li key={name + index}>
                <QueueItem
                  id={id}
                  name={name}
                  number={number}
                  timeAgo={timeAgo}
                  opened={selected == index}
                  onClose={() => {
                    if (selected == index) setSelected(-1);
                  }}
                  onPress={() => goToSelection(index)}
                />
              </li>
            ))}
          </ScrollView>
        ) : (
          <span>nothing...</span>
        )}
      </div>
    </div>
  );
}
