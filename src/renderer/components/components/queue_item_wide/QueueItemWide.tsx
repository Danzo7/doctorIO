import React from 'react';
import './style/index.scss';
import PregnantState from 'toSvg/pregnant.svg?url';
import InviteIn from 'toSvg/invitePatientIn.svg';
import { css } from '@emotion/css';
import BackButton from '@buttons/back_button';
import TextIconButton from '@components/buttons/text_icon_button';

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

        <div className="buttons">
          <TextIconButton Icon={InviteIn} text="invite in"></TextIconButton>
          <TextIconButton Icon={InviteIn} text="invite in"></TextIconButton>
        </div>
      </div>
      <div className="preview">
        <div>
          <img
            src={PregnantState}
            className={`${css({
              width: '95%',
            })}`}
          />
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
