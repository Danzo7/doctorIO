import React from 'react';
import './style/index.scss';
import PregnantState from 'toSvg/pregnant.svg';
import BackButton from '@buttons/back_button';
import ButtonsHoverLock from './buttons_hover_lock';

interface QueueItemWideProps {
  name: string;
  timeAgo: string;
  number: number;
  state?: string;
  backBtnOnClick: () => void;
}

function QueueItemWide({
  name,
  timeAgo,
  number,
  backBtnOnClick,
}: QueueItemWideProps) {
  return (
    <div className="queue-item-wide">
      <div className="back-container">
        <div className="back">
          <BackButton onClick={backBtnOnClick} />
        </div>
      </div>
      <div className="content">
        <div className="pat-info">
          <span>{name}</span>
          <span>{timeAgo}</span>
        </div>
        <ButtonsHoverLock />
      </div>
      <div className="preview">
        <div>
          <PregnantState />
        </div>
        <div className="number">
          <span>Number</span>
          <span>{number}</span>
        </div>
      </div>
    </div>
  );
}

export default QueueItemWide;
