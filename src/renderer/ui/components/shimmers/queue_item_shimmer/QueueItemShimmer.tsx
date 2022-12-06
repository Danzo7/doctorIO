import ShimmerDiv from '../shimmer_div';
import './style/index.scss';
interface QueueItemShimmerProps {}
export default function QueueItemShimmer({}: QueueItemShimmerProps) {
  return (
    <div className="queue-item-shimmer">
      <ShimmerDiv height={40} width={40} borderRadius={10} />
      <ShimmerDiv height={50} width={25} borderRadius={42} />
      <ShimmerDiv height={25} width={25} borderRadius={'100%'} />
      <ShimmerDiv height={40} width={40} borderRadius={10} />
    </div>
  );
}
