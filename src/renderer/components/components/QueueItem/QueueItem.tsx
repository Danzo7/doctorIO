import React, { useState, useContext } from 'react';
import './style/index.scss';
import QueueItemSmall from './queue_item_small';
import QueueItemWide from './queue_item_wide';
import { VisibilityContext } from 'react-horizontal-scrolling-menu';

interface QueueItemProps {
  name: string;
  number: number;
  timeAgo: string;
  state?: string;
  itemId?: number;
  onPress?: (visibility: any) => void;
}
function QueueItem({ name, number, state, timeAgo, onPress }: QueueItemProps) {
  const [isActive, activate] = useState(false);
  const visibility = useContext(VisibilityContext);

  const setActive = (value: boolean) => {
    console.log(onPress);
    activate(value);
    //onPress?.(visibility);
  };
  return (
    <div
      className={`queue-item ${isActive ? 'wide' : ''}`}
      onClick={() => onPress?.(visibility)}
    >
      {!isActive && (
        <div onClick={() => setActive(true)}>
          <QueueItemSmall
            name={name}
            state={state}
            number={number}
          ></QueueItemSmall>
        </div>
      )}
      {isActive && (
        <div>
          <QueueItemWide
            name={name}
            state={state}
            number={number}
            timeAgo={timeAgo}
            backBtnOnClick={() => setActive(false)}
          ></QueueItemWide>
        </div>
      )}
    </div>
  );
}

export default QueueItem;
