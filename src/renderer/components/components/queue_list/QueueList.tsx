/* eslint-disable no-unused-vars */
import QueueItem from '@components/QueueItem';
import React, { useState } from 'react';
import './style/index.scss';
import NextIcon from 'toSvg/next.svg?icon';
import PauseIcon from 'toSvg/pause.svg?icon';
import ScrollView from './scroll_view';

interface QueueListProps {}

const itemList = [
  {
    name: 'adam smith',
    number: 0,
    timeAgo: 'created 1h ago',
  },
  {
    name: 'adam smith',
    number: 1,
    timeAgo: 'created 1h ago',
  },
  {
    name: 'adam smith',
    number: 2,
    timeAgo: 'created 1h ago',
  },
  {
    name: 'adam smith',
    number: 3,
    timeAgo: 'created 1h ago',
  },
  {
    name: 'adam smith',
    number: 4,
    timeAgo: 'created 1h ago',
  },
];
function QueueList({}: QueueListProps) {
  const [items, setItems] = useState(itemList);
  const [selected, setSelected] = useState(-1);

  return (
    <div className="queue-list">
      <div className="header">
        <span>Appointment</span>
        <div className="control">
          <div className="next">
            <NextIcon width={10} />
          </div>
          <div className="pause">
            <PauseIcon width={8} />
          </div>
        </div>
      </div>
      <div className="queue-items">
        <ScrollView>
          {items.map(({ name, number, timeAgo }, index) => (
            <div>
              <QueueItem
                name={name}
                number={number}
                timeAgo={timeAgo}
                key={index}
                opened={selected == index}
                onPress={() => setSelected(index)}
              />
            </div>
          ))}
        </ScrollView>
        <div className="scrollbar"></div>
      </div>
    </div>
  );
}

export default QueueList;
