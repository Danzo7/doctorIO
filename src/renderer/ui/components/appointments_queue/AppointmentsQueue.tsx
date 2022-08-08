import colors, { color } from '@assets/styles/color';
import QueueItemWide from './components/queue_item/queue_item_wide';
import ScrollView from '@components/scroll_view';
import TextButton from '@components/buttons/text_button';
import CabinState from '@components/cabin_state';
import { useScroller } from '@libs/hooks/useScroller';
import Arrow from 'toSvg/arrow.svg?icon';
import './style/index.scss';
import Header from '@components/header';
import QueueControls from '@components/queue_controls';
import Backdrop from '@components/backdrop';
import { useAppSelector } from '@store';
import { useDispatch } from 'react-redux';
import { resumeAppointmentQueue } from '@redux/instance/appointmentQueue/appointmentQueueSlice';

export default function AppointmentsQueue() {
  const { ref, gotoFirst, gotoLast, next, previous } = useScroller(10);
  const dispatch = useDispatch();
  const { appointments, state, isOwner } = useAppSelector(
    (AppState) => AppState.appointmentQueue,
  );
  return (
    <div className="appointments-queue">
      <Header title="Queue list" buttonNode={<QueueControls />} />
      <div className="appointments-queue-content">
        <CabinState />
        <div className="wrapper">
          <Backdrop
            when={state == 'PAUSED'}
            backdropItems={
              <>
                <span css={{ fontSize: 15 }}>
                  Queue is paused
                  {!isOwner && (
                    <>
                      {' by'} <span css={{ fontWeight: 600 }}>The owner</span>
                    </>
                  )}
                </span>
                {isOwner && (
                  <TextButton
                    text="resume"
                    backgroundColor={color.good_green}
                    onPress={() => {
                      dispatch(resumeAppointmentQueue());
                    }}
                  />
                )}
              </>
            }
          >
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
              {appointments.length > 0 ? (
                <ScrollView refs={ref} gap={10}>
                  {appointments.map(
                    (
                      { date, patientId, patientName, test, position },
                      index,
                    ) => (
                      <li key={patientId.toString() + index}>
                        <QueueItemWide
                          id={patientId}
                          name={patientName}
                          number={position}
                          timeAgo={date}
                          width={150}
                          diagnosis={test}
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
          </Backdrop>
        </div>
      </div>
    </div>
  );
}
