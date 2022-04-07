/* eslint-disable no-unused-vars */
import QueueItem from '@components/QueueItem';
import React, { useState } from 'react';
import './style/index.scss';
import { ScrollMenu } from 'react-horizontal-scrolling-menu';
import NextIcon from 'toSvg/next.svg?icon';
import PauseIcon from 'toSvg/pause.svg?icon';

interface QueueListProps {}

const itemList = [
  {
    name: 'adam smith',
    number: 1,
    timeAgo: 'created 1h ago',
  },
  {
    name: 'adam smith',
    number: 1,
    timeAgo: 'created 1h ago',
  },
  {
    name: 'adam smith',
    number: 1,
    timeAgo: 'created 1h ago',
  },
  {
    name: 'adam smith',
    number: 1,
    timeAgo: 'created 1h ago',
  },
  {
    name: 'adam smith',
    number: 1,
    timeAgo: 'created 1h ago',
  },
];
function QueueList({}: QueueListProps) {
  const [items, setItems] = useState(itemList);
  const [selected, setSelected] = useState(0);
  //const [position, setPosition] = useState(0);
  const isItemSelected = (id: number) => selected === id;

  const handleClick =
    (id: number) =>
    ({ getItemById, scrollToItem }: any) => {
      console.log({ getItemById, scrollToItem, id });
      scrollToItem(id);
      setSelected(id);
    };
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
        <ScrollMenu>
          {items.map(({ name, number, timeAgo }, index) => (
            <QueueItem
              name={name}
              number={number}
              timeAgo={timeAgo}
              onPress={handleClick(index)}
            />
          ))}
        </ScrollMenu>
        <div className="scrollbar"></div>
      </div>
    </div>
  );
}

export default QueueList;
