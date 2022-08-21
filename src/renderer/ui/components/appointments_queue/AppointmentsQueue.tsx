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
import {
  useGetIsQueueOwnerQuery,
  useGetQueueAppointmentsQuery,
  useGetQueueStateQuery,
  useResumeQueueMutation,
} from '@redux/instance/appointmentQueue/AppointmentQueueApi';
import { QueueState } from '@models/instance.model';
import LoadingSpinner from '@components/loading_spinner';

export default function AppointmentsQueue() {
  const { ref, gotoFirst, gotoLast, next } = useScroller(10);

  const queueStateQuery = useGetQueueStateQuery(1);
  const isQueueOwnerQuery = useGetIsQueueOwnerQuery(1, {
    skip: !queueStateQuery.isSuccess,
  });
  const getQueueAppointmentsQuery = useGetQueueAppointmentsQuery(1, {
    skip: !isQueueOwnerQuery.isSuccess,
  });
  const [ResumeQueue] = useResumeQueueMutation();

  return getQueueAppointmentsQuery.isLoading &&
    getQueueAppointmentsQuery.isFetching ? (
    <LoadingSpinner />
  ) : getQueueAppointmentsQuery.isSuccess ? (
    (() => {
      const { state, selected } = queueStateQuery.data as QueueState;
      const isOwner = isQueueOwnerQuery.data;
      const appointments = getQueueAppointmentsQuery.data;

      return (
        <div className="appointments-queue">
          <Header title="Queue list" buttonNode={<QueueControls />} />
          <div className="appointments-queue-content">
            <CabinState state={state} selected={selected} />
            <div className="wrapper">
              <Backdrop
                when={state == 'PAUSED'}
                backdropItems={
                  <>
                    <span css={{ fontSize: 15 }}>
                      Queue is paused
                      {!isOwner && (
                        <>
                          {' by'}{' '}
                          <span css={{ fontWeight: 600 }}>The owner</span>
                        </>
                      )}
                    </span>
                    {isOwner && (
                      <TextButton
                        text="resume"
                        backgroundColor={color.good_green}
                        onPress={() => {
                          ResumeQueue(1);
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
                    onHold={gotoFirst}
                  >
                    <Arrow css={{ transform: 'rotate(90deg)' }} />
                  </TextButton>
                  {appointments.length > 0 ? (
                    <ScrollView refs={ref} gap={10}>
                      {appointments.map(
                        (
                          {
                            date,
                            patientId,
                            patientName,
                            test,
                            position,
                            appointmentId,
                          },
                          index,
                        ) => (
                          <li key={patientId.toString() + index}>
                            <QueueItemWide
                              id={patientId}
                              name={patientName}
                              number={position}
                              timeAgo={date}
                              width={150}
                              test={test}
                              appointmentId={appointmentId}
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
    })()
  ) : (
    <div>Error</div>
  );
}
