/* eslint-disable no-unused-vars */
import QueueItem from '@components/appointments_queue/components/queue_item';
import { useState } from 'react';
import ScrollView from '@components/scroll_view';
import { useScroller } from '@libs/hooks/useScroller';
import QueueControls from '@components/queue_controls';
import { color } from '@assets/styles/color';
import TextButton from '@components/buttons/text_button';
import Backdrop from '@components/backdrop';
import WaitingRoom from 'toSvg/waitingRoom.svg?icon';
import {
  useGetIsQueueOwnerQuery,
  useGetQueueAppointmentsQuery,
  useGetQueueStateQuery,
  useResumeQueueMutation,
} from '@redux/instance/appointmentQueue/AppointmentQueueApi';
import { QueueState } from '@models/instance.model';
import PreviewList from '@components/preview_list';
import VerticalPanel from '@components/vertical_panel';
import QueueAddSearchModal from '@containers/modals/queue_add_search_modal';
import RefetchPanel from '@components/refetch_panel';
import { modal } from '@stores/overlayStore';
import { useSelectedQueue } from '@stores/queueSelectionStore';
import ShimmerDiv from '@components/shimmers/shimmer_div';
import QueueItemShimmer from '@components/shimmers/queue_item_shimmer';

interface AppointmentQueueSmallProps {}

export default function AppointmentQueueSmall({}: AppointmentQueueSmallProps) {
  const selectedQueue = useSelectedQueue();

  const queueStateQuery = useGetQueueStateQuery(selectedQueue);
  const isQueueOwnerQuery = useGetIsQueueOwnerQuery(selectedQueue, {
    skip: !queueStateQuery.isSuccess,
  });
  const getQueueAppointmentsQuery = useGetQueueAppointmentsQuery(
    selectedQueue,
    {
      skip: !isQueueOwnerQuery.isSuccess,
    },
  );
  const [ResumeQueue] = useResumeQueueMutation();
  const [selected, setSelected] = useState(-1);
  const { ref, gotoFrom } = useScroller(10);
  return getQueueAppointmentsQuery.isUninitialized ||
    getQueueAppointmentsQuery.isFetching ? (
    <PreviewList
      title="Queue list"
      overflow="visible"
      buttonNode={<ShimmerDiv width={25} height={25} />}
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
  ) : getQueueAppointmentsQuery.isSuccess ? (
    (() => {
      const { state } = queueStateQuery.data as QueueState;
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      const isOwner = isQueueOwnerQuery.data!;
      const appointments = getQueueAppointmentsQuery.data;

      return (
        <PreviewList
          title="Queue list"
          overflow="visible"
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
        >
          {appointments.length == 0 && state != 'PAUSED' ? (
            <VerticalPanel
              title="Queue is empty"
              description="Start by adding a patient to the queue. "
              height={217}
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
              Icon={<WaitingRoom width={'80%'} height={'100%'} />}
              backgroundColor={'none'}
              padding={'15px 0 0 0'}
            />
          ) : (
            <Backdrop
              when={state == 'PAUSED'}
              backdropItems={
                <>
                  <span css={{ fontSize: 14 }}>
                    Queue is paused
                    {!isOwner && (
                      <>
                        {' by'} <span css={{ fontWeight: 600 }}>The owner</span>
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
              <ScrollView refs={ref} gap={10}>
                {appointments &&
                  appointments.map(
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
                      <div
                        key={patientId.toString() + index}
                        onClick={() => {
                          if (selected == index) setSelected(-1);
                          else {
                            if (selected > appointments.length - 1) return;
                            gotoFrom(index, selected);
                            setSelected(index);
                          }
                        }}
                      >
                        <QueueItem
                          id={patientId}
                          name={patientName}
                          number={position}
                          timeAgo={date}
                          biometricScreening={test}
                          opened={selected == index}
                          appointmentId={appointmentId}
                        />
                      </div>
                    ),
                  )}
              </ScrollView>
            </Backdrop>
          )}
        </PreviewList>
      );
    })()
  ) : (
    <RefetchPanel action={getQueueAppointmentsQuery.refetch} />
  );
}
