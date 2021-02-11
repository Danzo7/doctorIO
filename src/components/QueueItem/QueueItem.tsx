import React from 'react';
import './style/index.scss';

interface QueueItem {
  name: string;
  position: number;
}

function QueueItem({ name, position }: QueueItem) {
  return (
    <div className="queue-item">
      <div className="client-name">{name}</div>
      <div className="index-section">
        <span className="text">{position}</span>
      </div>
    </div>
  );
}

export default QueueItem;
