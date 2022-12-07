import { color } from '@assets/styles/color';
import BorderSeparator from '@components/border_separator';
import TextButton from '@components/buttons/text_button';
import Header from '@components/header';
import QueueItemWideShimmer from '../queue_item_wide_shimmer';
import ShimmerDiv from '../shimmer_div';
import Arrow from 'toSvg/arrow.svg?icon';
import './style/index.scss';
import LinkedRole from '@components/linked_role';
import { useQueueSelectionStore } from '@stores/queueSelectionStore';
import ScrollView from '@components/scroll_view';
import { useScroller } from '@libs/hooks/useScroller';
interface AppointmentsQueueShimmerProps {}
export default function AppointmentsQueueShimmer({}: AppointmentsQueueShimmerProps) {
  const { ref } = useScroller(10);
  return (
    <div className="appointments-queue-shimmer">
      <Header
        alignItems="center"
        leftComponent={
          <LinkedRole
            linkedText="Queue List"
            linkedRole={
              useQueueSelectionStore.getState().getSelectedQueue().name
            }
          />
        }
        buttonNode={
          <div className="shimmer-controls">
            <ShimmerDiv width={25} height={25} />
            <ShimmerDiv width={25} height={25} />
            <ShimmerDiv width={25} height={25} />
          </div>
        }
      />
      <div className="appointments-shimmer-content">
        <div className="cabin-shimmer">
          <span>Status</span>
          <ShimmerDiv width={200} height={38} borderRadius={7} />
        </div>
        <BorderSeparator direction="vertical" />

        <div className="shimmer-items-div">
          <TextButton borderColor={color.border_color} padding="30px 10px">
            <Arrow
              width={10.1}
              height={13.32}
              css={{ transform: 'rotate(90deg)' }}
            />
          </TextButton>
          <ScrollView refs={ref} gap={10}>
            <QueueItemWideShimmer />
            <QueueItemWideShimmer />
            <QueueItemWideShimmer />
          </ScrollView>
          <TextButton borderColor={color.border_color} padding="30px 10px">
            <Arrow
              width={10.1}
              height={13.32}
              css={{ transform: 'rotate(-90deg)' }}
            />
          </TextButton>
        </div>
      </div>
    </div>
  );
}
