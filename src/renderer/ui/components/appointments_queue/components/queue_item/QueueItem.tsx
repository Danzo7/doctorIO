import { useEffect, useState } from 'react';
import './style/index.scss';
import QueueItemSmall from './queue_item_small';
import QueueItemWide from './queue_item_wide';
import { BiometricScreening } from '@models/instance.model';

interface QueueItemProps {
  id: number;
  name: string;
  timeAgo: Date;
  number: number;
  state?: string;
  width?: number;
  biometricScreening?: BiometricScreening;
  opened?: boolean;
  appointmentId: number;
}
function QueueItem({
  id,
  name,
  number,
  state,
  timeAgo,
  opened,
  biometricScreening,
  width,
  appointmentId,
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
            id={id}
            name={name}
            number={number}
            timeAgo={timeAgo}
            width={width}
            biometricScreening={biometricScreening}
            appointmentId={appointmentId}
            state={state}
          />
        </div>
      )}
    </div>
  );
}

export default QueueItem;
