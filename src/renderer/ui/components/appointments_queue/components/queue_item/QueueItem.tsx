import { useState } from 'react';
import './style/index.scss';
import QueueItemSmall from './queue_item_small';
import QueueItemWide from './queue_item_wide';

interface QueueItemProps {
  id: number;
  name: string;
  number: number;
  timeAgo: Date;
  state?: string;
  itemId?: number;
  opened?: boolean;
  onPress?: () => void;
  onClose?: () => void;
}
function QueueItem({
  id,
  name,
  number,
  state,
  timeAgo,
  opened,
  onPress,
  onClose,
}: QueueItemProps) {
  const [isOpen, open] = useState(opened ?? false);

  if (opened != undefined && opened != isOpen) open(opened);
  const setopen = (value: boolean) => {
    open(value);
    if (isOpen == false) onPress?.();
  };
  return (
    <div className={`queue-item ${isOpen ? 'wide' : ''}`}>
      {!isOpen && (
        <div onClick={() => setopen(true)}>
          <QueueItemSmall
            name={name}
            state={state}
            number={number}
          ></QueueItemSmall>
        </div>
      )}
      {isOpen && (
        <div>
          <QueueItemWide
            id={id}
            name={name}
            state={state}
            number={number}
            timeAgo={timeAgo}
            onClose={() => {
              onClose?.();
              setopen(false);
            }}
          ></QueueItemWide>
        </div>
      )}
    </div>
  );
}

export default QueueItem;
