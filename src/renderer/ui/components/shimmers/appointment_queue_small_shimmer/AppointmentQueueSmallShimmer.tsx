import PreviewList from '@components/preview_list';
import QueueItemShimmer from '../queue_item_shimmer';
import ShimmerDiv from '../shimmer_div';
import './style/index.scss';
interface AppointmentQueueSmallShimmerProps {}
export default function AppointmentQueueSmallShimmer({}: AppointmentQueueSmallShimmerProps) {
  return (
    <PreviewList
      title="Queue list"
      overflow="visible"
      buttonNode={
        <div className="shimmer-controls">
          <ShimmerDiv width={25} height={25} />
          <ShimmerDiv width={25} height={25} />
          <ShimmerDiv width={25} height={25} />
        </div>
      }
    >
      <div
        css={{
          display: 'flex',
          flexDirection: 'row',
          gap: 10,
          paddingBottom: 10,
          overflowX: 'scroll',
        }}
      >
        <QueueItemShimmer />
        <QueueItemShimmer />
        <QueueItemShimmer />
      </div>
    </PreviewList>
  );
}
