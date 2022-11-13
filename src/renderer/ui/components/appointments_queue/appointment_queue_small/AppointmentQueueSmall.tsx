/* eslint-disable no-unused-vars */
import QueueItem from '@components/appointments_queue/components/queue_item';
import { useState } from 'react';
import ScrollView from '@components/scroll_view';
import { useScroller } from '@libs/hooks/useScroller';
import QueueControls from '@components/queue_controls';
import { color } from '@assets/styles/color';
import TextButton from '@components/buttons/text_button';
import Backdrop from '@components/backdrop';
import {
  useGetIsQueueOwnerQuery,
  useGetQueueAppointmentsQuery,
  useGetQueueStateQuery,
  useResumeQueueMutation,
} from '@redux/instance/appointmentQueue/AppointmentQueueApi';
import { QueueState } from '@models/instance.model';
import LoadingSpinner from '@components/loading_spinner';
import SimpleInfoContainer from '@components/simple_info_container';
import PreviewList from '@components/preview_list';

interface AppointmentQueueSmallProps {}

export default function AppointmentQueueSmall({}: AppointmentQueueSmallProps) {
  const queueStateQuery = useGetQueueStateQuery();
  const isQueueOwnerQuery = useGetIsQueueOwnerQuery(undefined, {
    skip: !queueStateQuery.isSuccess,
  });
  const getQueueAppointmentsQuery = useGetQueueAppointmentsQuery(undefined, {
    skip: !isQueueOwnerQuery.isSuccess,
  });
  const [ResumeQueue] = useResumeQueueMutation();
  const [selected, setSelected] = useState(-1);
  const { ref, gotoFrom } = useScroller(10);
  return getQueueAppointmentsQuery.isUninitialized ||
    getQueueAppointmentsQuery.isLoading ? (
    <LoadingSpinner />
  ) : getQueueAppointmentsQuery.isSuccess ? (
    (() => {
      const { state } = queueStateQuery.data as QueueState;
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      const isOwner = isQueueOwnerQuery.data!;
      const appointments = getQueueAppointmentsQuery.data;

      return (
        <PreviewList
          title="Queue list"
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
            <SimpleInfoContainer text="Empty" />
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
                        ResumeQueue();
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
                          test={test}
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
    <div>Error</div>
  );
}
