import colors from '@assets/styles/color';
import QueueItemWide from './components/queue_item/queue_item_wide';
import ScrollView from '@components/scroll_view';
import TextButton from '@components/buttons/text_button';
import CabinState from '@components/cabin_state';
import { useScroller } from '@libs/hooks/useScroller';
import Arrow from 'toSvg/arrow.svg?icon';
import './style/index.scss';
import { subDays } from 'date-fns';
import Header from '@components/header';
import QueueControls from '@components/queue_controls';
interface AppointmentsQueueProps {
  cabinState: 'inProgress' | 'paused';
}
const items = [
  {
    id: 1,
    name: 'adam smith',
    timeAgo: subDays(new Date(), 3),
    number: 20,
  },
  { id: 2, name: 'adam smith', timeAgo: subDays(new Date(), 3), number: 21 },
  { id: 3, name: 'adam smith', timeAgo: subDays(new Date(), 3), number: 22 },
  { id: 4, name: 'adam smith', timeAgo: subDays(new Date(), 2), number: 23 },
  { id: 5, name: 'adam smith', timeAgo: subDays(new Date(), 1), number: 24 },
];
export default function AppointmentsQueue({
  cabinState,
}: AppointmentsQueueProps) {
  const { ref, gotoFirst, gotoLast, next, previous } = useScroller(10);

  return (
    <div className="appointments-queue">
      <Header
        title="Queue list"
        buttonNode={<QueueControls role={{ roleName: 'owner' }} />}
      />
      <div className="appointments-queue-content">
        <CabinState
          state={cabinState}
          arrivalTime={subDays(new Date(), 5)}
          patientName="John doe"
          position={12}
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
              {items.map(({ name, id, timeAgo, number }, index) => (
                <li key={name + index}>
                  <QueueItemWide
                    id={id}
                    name={name}
                    number={number}
                    timeAgo={timeAgo}
                    width={150}
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
