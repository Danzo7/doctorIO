import './style/index.scss';
import PregnantState from 'toSvg/pregnant.svg';
import WaitingFigure from 'toSvg/waiting_figure.svg';
import BackButton from '@buttons/back_button';
import ButtonsHoverLock from './buttons_hover_lock';

interface QueueItemWideProps {
  name: string;
  timeAgo: string;
  number: number;
  state?: string;
  btnOnclick: () => void;
}

function QueueItemWide({
  name,
  timeAgo,
  number,
  btnOnclick,
  state,
}: QueueItemWideProps) {
  const Svg = state === 'urgent' ? PregnantState : WaitingFigure;
  return (
    <div className="queue-item-wide">
      <div className="back-container">
        <div className="back">
          <BackButton onClick={btnOnclick} />
        </div>
      </div>
      <div className="content">
        <div className="pat-info">
          <span>{name}</span>
          <span>{timeAgo}</span>
        </div>
        <ButtonsHoverLock />
      </div>
      <div className={`preview ${state ?? ''}`}>
        <div>
          <Svg />
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
