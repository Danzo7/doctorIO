import LinkyIcon from '@components/LinkyIcon';
import React from 'react';
import './style/index.scss';
import url, { ReactComponent as Indicator } from 'toSvg/exclamation.svg';
import image from '/src/renderer/assets/icon/icon.png';

interface QueueItem {
  name: string;
  position: number;
  type?: string;
  variant?: string;
}
function QueueItem({ name, position, type }: QueueItem) {
  return (
    <div className="queue-item">
      <div className={'indicator ' + (type === 'urgent' ? 'isUrgent' : '')}>
        <img src={image}></img>
        <LinkyIcon
          Src={url}
          viewBox="-10 -10 50  50"
          alt={'home'}
          width="50%"
        />
      </div>
      <div className="client-name">{name}</div>
      <div className="index-section">
        <span className="text">{position}</span>
      </div>
    </div>
  );
}

export default QueueItem;
