import './style/index.scss';
import PregnantState from 'toSvg/pregnant.svg';
import WaitingFigure from 'toSvg/waiting_figure.svg';
import threeDots from 'toSvg/threedots.svg?icon';
import SquareIconButton from '@components/buttons/square_icon_button';
import colors from '@colors';
import invite from 'toSvg/enter.svg?icon';
import view from 'toSvg/view_test.svg?icon';
import TextIconButton from '@components/buttons/text_icon_button';
interface QueueItemWideProps {
  name: string;
  timeAgo: string;
  number: number;
  state?: string;
  btnOnclick?: () => void;
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
    <div className="queue-item-wide" onClick={btnOnclick}>
      <div className="back-container">
        <div className="back">
          <SquareIconButton svg={threeDots} />
        </div>
      </div>
      <div className="content">
        <div className="pat-info">
          <span>{name}</span>
          <span>{timeAgo}</span>
        </div>
        <div className="buttons-hover-lock">
          <TextIconButton
            //onMouseOver={setActive}
            Icon={invite}
            text="invite in"
            color={colors.good_green}
          />
          <TextIconButton
            //onMouseOver={setActive}
            Icon={view}
            text="View tests"
            color={colors.cold_blue}
          />
        </div>
      </div>
      <div
        className={`preview ${state ?? ''}`}
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
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
