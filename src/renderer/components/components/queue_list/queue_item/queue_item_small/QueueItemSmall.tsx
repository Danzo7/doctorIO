import React from 'react';
import './style/index.scss';
import Indicator from 'toSvg/exclamation.svg';

interface QueueItemSmallProps {
  name: string;
  number: number;
  state?: string;
}
function QueueItemSmall({ name, state, number }: QueueItemSmallProps) {
  return (
    <div className="queue-item-small">
      <div className={'indicator ' + state}>
        <Indicator />
      </div>
      <div className="client-name">{name}</div>
      <div className="index-section">
        <span className="text">{number}</span>
      </div>
    </div>
  );
}
export default QueueItemSmall;
