import React, { useState } from 'react';
import './style/index.scss';
import QueueItemSmall from './queue_item_small';
import QueueItemWide from './queue_item_wide';

interface QueueItemProps {
  name: string;
  number: number;
  timeAgo: string;
  state?: string;
  itemId?: number;
  opened?: boolean;
  onPress?: () => void;
}
function QueueItem({
  name,
  number,
  state,
  timeAgo,
  opened,
  onPress,
}: QueueItemProps) {
  const [, activate] = useState(opened ?? false);
  const setActivate = (value: boolean) => {
    opened = value;
    activate(value);

    if (value == true) onPress?.();
  };
  return (
    <div className={`queue-item ${opened ? 'wide' : ''}`}>
      {!opened && (
        <div onClick={() => setActivate(true)}>
          <QueueItemSmall
            name={name}
            state={state}
            number={number}
          ></QueueItemSmall>
        </div>
      )}
      {opened && (
        <div>
          <QueueItemWide
            name={name}
            state={state}
            number={number}
            timeAgo={timeAgo}
            backBtnOnClick={() => setActivate(false)}
          ></QueueItemWide>
        </div>
      )}
    </div>
  );
}

export default QueueItem;
