import { useEffect, useState } from 'react';
import './style/index.scss';
import QueueItemSmall from './queue_item_small';
import QueueItemWide from './queue_item_wide';
import { TestResult } from '@models/instance.model';

interface QueueItemProps {
  id: number;
  name: string;
  timeAgo: Date;
  number: number;
  state?: string;
  width?: number;
  diagnosis?: TestResult;
  opened?: boolean;
}
function QueueItem({
  id,
  name,
  number,
  state,
  timeAgo,
  opened,
  diagnosis,
  width,
}: QueueItemProps) {
  const [isOpen, open] = useState(opened ?? false);
  useEffect(() => {
    open(opened ?? false);
  }, [opened]);
  return (
    <div className={`queue-item ${isOpen ? 'wide' : ''}`}>
      {!isOpen && (
        <div onClick={() => open(true)}>
          <QueueItemSmall
            name={name}
            state={state}
            number={number}
          ></QueueItemSmall>
        </div>
      )}
      {isOpen && (
        <div onClick={() => open(false)}>
          <QueueItemWide
            {...{
              id,
              name,
              number,
              state,
              timeAgo,
              opened,
              diagnosis,
              width,
            }}
          />
        </div>
      )}
    </div>
  );
}

export default QueueItem;
