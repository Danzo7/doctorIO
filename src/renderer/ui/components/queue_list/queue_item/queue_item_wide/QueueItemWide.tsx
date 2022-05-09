import './style/index.scss';
import PregnantState from 'toSvg/pregnant.svg';
import WaitingFigure from 'toSvg/waiting_figure.svg';
import threeDots from 'toSvg/threedots.svg?icon';
import SquareIconButton from '@components/buttons/square_icon_button';
import ButtonsHoverLock from './buttons_hover_lock';

interface QueueItemWideProps {
  name: string;
  timeAgo: string;
  number: number;
  state?: string;
  btnOnclick: () => void;
  isDependent?: boolean;
}

function QueueItemWide({
  name,
  timeAgo,
  number,
  btnOnclick,
  state,
  isDependent = true,
}: QueueItemWideProps) {
  const Svg = state === 'urgent' ? PregnantState : WaitingFigure;
  return (
    <div className="queue-item-wide">
      <div className="back-container">
        <div className="back">
          <SquareIconButton
            onPress={btnOnclick}
            svg={isDependent ? threeDots : undefined}
          />
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
