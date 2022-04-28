/* eslint-disable no-unused-vars */
import QueueItem from './queue_item';
import { useState } from 'react';
import './style/index.scss';
import NextIcon from 'toSvg/next.svg?icon';
import PauseIcon from 'toSvg/pause.svg?icon';
import ScrollView from './scroll_view';
import ScrollController from './scroll_view/ScrollController';

interface QueueListProps {}

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
const controller = new ScrollController();

function QueueList({}: QueueListProps) {
  const [selected, setSelected] = useState(-1);
  const [items, setItems] = useState(itemsL);
  function goToSelection(index: number) {
    if (selected > items.length - 1) return;
    controller.scrollTo(index, selected);
    setSelected(index);
  }
  return (
    <div className="queue-list">
      <div className="header">
        <span>Appointment</span>
        <div className="control">
          <div
            className="next"
            onClick={() => {
              setItems(items.slice(1, items.length));
              setSelected(-1);
              controller.scrollTo(0, selected);
            }}
          >
            <NextIcon width={10} />
          </div>
          <div className="pause">
            <PauseIcon width={8} />
          </div>
        </div>
      </div>
      <div className="queue-items">
        {items.length > 0 ? (
          <ScrollView controller={controller} gap={10}>
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
        <div className="scrollbar"></div>
      </div>
    </div>
  );
}

export default QueueList;
