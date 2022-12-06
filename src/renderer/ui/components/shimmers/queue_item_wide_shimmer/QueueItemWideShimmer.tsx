import Header from '@components/header';
import './style/index.scss';
import ThreeDots from 'toSvg/threedots.svg?icon';
import ShimmerDiv from '../shimmer_div';
interface QueueItemWideShimmerProps {}
export default function QueueItemWideShimmer({}: QueueItemWideShimmerProps) {
  return (
    <div className="queue-item-wide-shimmer">
      <Header
        padding={'10px'}
        leftComponent={
          <ThreeDots css={{ transform: 'rotate(90deg)', opacity: 0.2 }} />
        }
      />
      <div className="sub-title-shimmer">
        <div>
          <div>
            <ShimmerDiv height={10} width={20} borderRadius={25} />
            <ShimmerDiv height={10} width={30} borderRadius={25} />
          </div>
          <ShimmerDiv height={7} width={60} borderRadius={25} />
        </div>
        <div className="middle-shimmer">
          <ShimmerDiv height={20} width={70} borderRadius={5} />
          <ShimmerDiv height={20} width={20} borderRadius={5} />
        </div>
      </div>

      <ShimmerDiv height={80} width={150} borderRadius={10} />
    </div>
  );
}
