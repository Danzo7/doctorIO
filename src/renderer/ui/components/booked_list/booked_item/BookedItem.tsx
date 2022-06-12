import './style/index.scss';
import Panding from 'toSvg/pending.svg';
import InQueue from 'toSvg/in_queue.svg';
import threeDots from 'toSvg/threedots.svg?icon';
import SquareIconButton from '@components/buttons/square_icon_button/SquareIconButton';

interface BookedItemProps {
  name: string;
  bookTime: string;
  onPressMenu?: () => void;
  state: 'panding' | 'in queue'; //This will force ts to accept only those values with their types.
}
function BookedItem({ name, bookTime, state, onPressMenu }: BookedItemProps) {
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
      <SquareIconButton svg={threeDots} onPress={onPressMenu} />
    </div>
  );
}

export default BookedItem;
