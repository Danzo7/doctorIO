import React from 'react';
import './style/index.scss';
import PregnantState from 'toSvg/pregnant.svg';
import BackButton from '@buttons/back_button';
import ButtonsHoverLock from './buttons_hover_lock';

interface QueueItemWideProps {}

function QueueItemWide({}: QueueItemWideProps) {
  return (
    <div className="queue-item-wide">
      <div className="back-container">
        <div className="back">
          <BackButton />
        </div>
      </div>
      <div className="content">
        <div className="pat-info">
          <span>John wild</span>
          <span>14 yo</span>
        </div>
        <ButtonsHoverLock />
      </div>
      <div className="preview">
        <div>
          <PregnantState />
        </div>
        <div className="number">
          <span>Number</span>
          <span>1</span>
        </div>
      </div>
    </div>
  );
}

export default QueueItemWide;
