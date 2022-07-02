import './style/index.scss';
import Indicator from 'toSvg/exclamation.svg?icon';

interface QueueItemSmallProps {
  name: string;
  number: number;
  state?: string;
}
function QueueItemSmall({ name, state, number }: QueueItemSmallProps) {
  return (
    <div className="queue-item-small">
      <div className={'indicator ' + state}>
        <Indicator width={30} height={30} />
      </div>
      <span className="client-name">{name}</span>
      <div className="index-section">
        <span className="text">{number}</span>
      </div>
    </div>
  );
}
export default QueueItemSmall;
