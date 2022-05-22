import colors from '@assets/styles/color';
import QueueItemWide from '@components/appointment_queue_small/queue_item/queue_item_wide';
import ScrollView from '@components/appointment_queue_small/scroll_view';
import TextButton from '@components/buttons/text_button';
import CabinState from '@components/cabin_state';
import { useScroller } from '@libs/hooks/useScroller';
import Arrow from 'toSvg/arrow.svg?icon';
import './style/index.scss';
interface AppointmentsQueueProps {}
const items = [
  {
    name: 'adam smith',
    timeAgo: 'created 1h ago',
    number: 20,
  },
  {
    name: 'adam smith',
    timeAgo: 'created 1h ago',
    number: 20,
  },
  {
    name: 'adam smith',
    timeAgo: 'created 1h ago',
    number: 21,
  },
  {
    name: 'adam smith',
    timeAgo: 'created 1h ago',
    number: 22,
  },
  {
    name: 'adam smith',
    timeAgo: 'created 1h ago',
    number: 23,
  },
  {
    name: 'adam smith',
    timeAgo: 'created 1h ago',
    number: 24,
  },
  {
    name: 'adam smith',
    timeAgo: 'created 1h ago',
    number: 25,
  },
  {
    name: 'adam smith',
    timeAgo: 'created 1h ago',
    number: 26,
  },
  {
    name: 'adam smith',
    timeAgo: 'created 1h ago',
    number: 27,
  },
  {
    name: 'adam smith',
    timeAgo: 'created 1h ago',
    number: 28,
  },
  {
    name: 'adam smith',
    timeAgo: 'created 1h ago',
    number: 29,
  },
  {
    name: 'adam smith',
    timeAgo: 'created 1h ago',
    number: 30,
  },
];
export default function AppointmentsQueue({}: AppointmentsQueueProps) {
  const { ref, gotoFirst, gotoLast, next, previous } = useScroller(6);

  return (
    <div className="appointments-queue">
      <div className="header"></div>
      <div className="content">
        <CabinState
          state="inProgress"
          duration="1 minute ago"
          patientName="John doe"
          patientNumber={12}
        />
        <div className="queue-list">
          <TextButton
            borderColor={colors.border_color}
            padding="30px 10px"
            afterBgColor={colors.darkersec_color}
            onPress={previous}
            onHold={gotoFirst}
          >
            <Arrow css={{ transform: 'rotate(90deg)' }} />
          </TextButton>
          {items.length > 0 ? (
            <ScrollView refs={ref} gap={10}>
              {items.map(({ name, timeAgo, number }, index) => (
                <li key={name + index}>
                  <QueueItemWide
                    name={name}
                    number={number}
                    timeAgo={timeAgo}
                  />
                </li>
              ))}
            </ScrollView>
          ) : (
            <span>nothing...</span>
          )}
          <TextButton
            borderColor={colors.border_color}
            padding="30px 10px"
            afterBgColor={colors.darkersec_color}
            onPress={next}
            onHold={gotoLast}
          >
            <Arrow css={{ transform: 'rotate(-90deg)' }} />
          </TextButton>
        </div>
      </div>
    </div>
  );
}
