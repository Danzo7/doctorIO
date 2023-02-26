import colors, { color } from '@assets/styles/color';
import QueueItemWide from './components/queue_item/queue_item_wide';
import ScrollView from '@components/scroll_view';
import TextButton from '@components/buttons/text_button';
import CabinState from '@components/cabin_state';
import WaitingRoom from 'toSvg/waitingRoom.svg?icon';
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
import BorderSeparator from '@components/border_separator';
import { useGetMyMemberDetailQuery } from '@redux/clinic/rbac/member/memberApi';
import LinkedRole from '@components/linked_role';
import VerticalPanel from '@components/vertical_panel';
import QueueAddSearchModal from '@containers/modals/queue_add_search_modal';
import { modal } from '@stores/overlayStore';
import RefetchPanel from '@components/refetch_panel';
import { useQueueSelectionStore } from '@stores/queueSelectionStore';
import AppointmentsQueueShimmer from '@components/shimmers/appointments_queue_shimmer';
import Door from 'toSvg/closed_door.svg';
import ToggleButton from '@components/buttons/toggle_button';

export default function AppointmentsQueue() {
  const { ref, gotoFirst, gotoLast, next } = useScroller(10);
  const selectedQueue = useQueueSelectionStore.getState().selectedQueue;
  const queueStateQuery = useGetQueueStateQuery(selectedQueue, {
    refetchOnMountOrArgChange: true,
  });
  const myMemberDetailQuery = useGetMyMemberDetailQuery(undefined, {
    skip: !queueStateQuery.isSuccess,
  });
  const isQueueOwnerQuery = useGetIsQueueOwnerQuery(selectedQueue, {
    skip: !queueStateQuery.isSuccess,
  });
  const getQueueAppointmentsQuery = useGetQueueAppointmentsQuery(
    selectedQueue,
    {
      skip: !isQueueOwnerQuery.isSuccess,
      refetchOnMountOrArgChange: true,
    },
  );
  const [ResumeQueue] = useResumeQueueMutation();

  return getQueueAppointmentsQuery.isLoading ||
    getQueueAppointmentsQuery.isUninitialized ? (
    <AppointmentsQueueShimmer />
  ) : getQueueAppointmentsQuery.isSuccess ? (
    (() => {
      const { state, selected } = queueStateQuery.data as QueueState;
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      const isOwner = isQueueOwnerQuery.data!;
      const appointments = getQueueAppointmentsQuery.data;

      return (
        <Backdrop when={getQueueAppointmentsQuery.isFetching}>
          <div className="appointments-queue">
            {myMemberDetailQuery.isSuccess &&
              myMemberDetailQuery.data.queues && (
                <>
                  <Header
                    alignItems="center"
                    leftComponent={
                      <LinkedRole
                        linkedText="Queue List"
                        linkedRole={
                          useQueueSelectionStore.getState().getSelectedQueue()
                            .name
                        }
                      />
                    }
                    buttonNode={
                      <QueueControls
                        {...{
                          state:
                            appointments.length == 0 && state != 'PAUSED'
                              ? 'EMPTY'
                              : state,
                          isOwner,
                        }}
                      />
                    }
                  />
                </>
              )}
            <div className="appointments-queue-content">
              <CabinState state={state} selected={selected} />
              <BorderSeparator direction="vertical" />
              {appointments.length == 0 && state != 'PAUSED' ? (
                <VerticalPanel
                  height={217}
                  title="Queue is empty"
                  description="Start by adding a patient to the queue. "
                  action={{
                    text: 'Add queue item',
                    onClick: () => {
                      modal(() => <QueueAddSearchModal />, {
                        closeOnClickOutside: true,
                        isDimmed: true,
                        clickThrough: false,
                        closeBtn: 'inner',
                        width: '30%',
                      }).open();
                    },
                  }}
                  Icon={<WaitingRoom width="60%" height="60%" />}
                  padding={'15px 0 0 15px'}
                />
              ) : (
                <div className="wrapper">
                  {appointments.length == 0 ? (
                    <VerticalPanel
                      title="Queue is paused"
                      description={
                        !isOwner
                          ? 'The owner of the queue has paused it.'
                          : undefined
                      }
                      bottomControls={
                        isOwner ? (
                          <div className="vertical-panel-control">
                            <span>Toggle the button to start the queue</span>
                            <ToggleButton
                              isChecked={false}
                              onChange={() => {
                                ResumeQueue(selectedQueue);
                              }}
                            />
                          </div>
                        ) : undefined
                      }
                      height={217}
                      padding={'15px 0 0 15px'}
                      Icon={<Door height="60%" />}
                    />
                  ) : (
                    <Backdrop
                      when={state == 'PAUSED'}
                      node={
                        <>
                          <span css={{ fontSize: 15 }}>
                            Queue is paused
                            {!isOwner && (
                              <>
                                {' by '}
                                <span css={{ fontWeight: 600 }}>The owner</span>
                              </>
                            )}
                          </span>
                          {isOwner && (
                            <TextButton
                              text="Resume"
                              backgroundColor={color.good_green}
                              onPress={() => {
                                ResumeQueue(selectedQueue);
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
                                  biometricScreening={test}
                                  appointmentId={appointmentId}
                                />
                              </li>
                            ),
                          )}
                        </ScrollView>
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
                  )}
                </div>
              )}
            </div>
          </div>
        </Backdrop>
      );
    })()
  ) : (
    <RefetchPanel action={getQueueAppointmentsQuery.refetch} />
  );
}
