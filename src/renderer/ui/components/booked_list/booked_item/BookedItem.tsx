import './style/index.scss';
import Panding from 'toSvg/pending.svg';
import InQueue from 'toSvg/in_queue.svg';
import threeDots from 'toSvg/threedots.svg?icon';
import SquareIconButton from '@components/buttons/square_icon_button/SquareIconButton';
import { useOverlay } from '@libs/overlay/useOverlay';
import Tooltip from '@components/poppers/tooltip';

interface BookedItemProps {
  name: string;
  bookTime: string;
  state: 'panding' | 'in queue';
}
function BookedItem({ name, bookTime, state }: BookedItemProps) {
  const { open } = useOverlay();
  return (
    <div className="booked-item">
      <div className="right-container">
        <div className="info-container">
          <span className="name">{name}</span>
          <span className="info">{bookTime}</span>
        </div>
        {state == 'panding' && (
          <div className="state-container">
            <Panding></Panding>
            <span>Panding</span>
          </div>
        )}
        {state == 'in queue' && (
          <div className="state-container">
            <InQueue></InQueue>
            <span>In queue</span>
          </div>
        )}
      </div>
      <SquareIconButton
        svg={threeDots}
        onPress={(e) => {
          open(
            <Tooltip
              actionList={[
                {
                  text: 'Add to queue',
                },
                {
                  text: 'View records',
                },
                {
                  text: 'Remove',
                  type: 'warning',
                },
              ]}
            />,
            {
              closeOnClickOutside: true,
              clickThrough: true,
              closeOnBlur: true,
              popperTarget: e?.currentTarget,
            },
          );
        }}
      />
    </div>
  );
}

export default BookedItem;
