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
import { appointmentQueueData } from '@api/fake';
interface AppointmentsQueueProps {
  cabinState: 'inProgress' | 'paused';
}

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
          {appointmentQueueData.appointments.length > 0 ? (
            <ScrollView refs={ref} gap={10}>
              {appointmentQueueData.appointments.map(
                (
                  { date, patientId, patientName, diagnosis, position },
                  index,
                ) => (
                  <li key={patientId.toString() + index}>
                    <QueueItemWide
                      id={patientId}
                      name={patientName}
                      number={position}
                      timeAgo={date}
                      width={150}
                      diagnosis={diagnosis}
                    />
                  </li>
                ),
              )}
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
