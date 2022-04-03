import React, { useState } from 'react';
import './style/index.scss';
import QueueItemSmall from './queue_item_small';
import QueueItemWide from './queue_item_wide';

interface QueueItemProps {
  name: string;
  number: number;
  timeAgo: string;
  state?: string;
}
function QueueItem({ name, number, state, timeAgo }: QueueItemProps) {
  const [isActive, activate] = useState(false);
  return (
    <div className={`queue-item ${isActive ? 'wide' : ''}`}>
      {!isActive && (
        <div onClick={() => activate(true)}>
          <QueueItemSmall
            name={name}
            state={state}
            number={number}
          ></QueueItemSmall>
        </div>
      )}
      {isActive && (
        <div onClick={() => activate(false)}>
          <QueueItemWide
            name={name}
            state={state}
            number={number}
            timeAgo={timeAgo}
          ></QueueItemWide>
        </div>
      )}
    </div>
  );
}

export default QueueItem;
