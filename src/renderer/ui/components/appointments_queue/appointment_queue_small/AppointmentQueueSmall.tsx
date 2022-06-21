/* eslint-disable no-unused-vars */
import QueueItem from '@components/appointments_queue/components/queue_item';
import { useState } from 'react';
import './style/index.scss';
import ScrollView from '@components/scroll_view';

import { useScroller } from '@libs/hooks/useScroller';
import QueueControls from '@components/queue_controls';

interface AppointmentQueueSmallProps {}

const itemsL = [
  {
    name: 'adam smith',
    timeAgo: 'created 1h ago',
    number: 20,
  },
  {
    name: 'adam smith',
    timeAgo: 'created 1h ago',
    number: 20,
  },
  {
    name: 'adam smith',
    timeAgo: 'created 1h ago',
    number: 21,
  },
  {
    name: 'adam smith',
    timeAgo: 'created 1h ago',
    number: 22,
  },
  {
    name: 'adam smith',
    timeAgo: 'created 1h ago',
    number: 23,
  },
  {
    name: 'adam smith',
    timeAgo: 'created 1h ago',
    number: 24,
  },
  {
    name: 'adam smith',
    timeAgo: 'created 1h ago',
    number: 25,
  },
  {
    name: 'adam smith',
    timeAgo: 'created 1h ago',
    number: 26,
  },
  {
    name: 'adam smith',
    timeAgo: 'created 1h ago',
    number: 27,
  },
  {
    name: 'adam smith',
    timeAgo: 'created 1h ago',
    number: 28,
  },
  {
    name: 'adam smith',
    timeAgo: 'created 1h ago',
    number: 29,
  },
  {
    name: 'adam smith',
    timeAgo: 'created 1h ago',
    number: 30,
  },
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
            {items.map(({ name, timeAgo, number }, index) => (
              <li key={name + index}>
                <QueueItem
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
