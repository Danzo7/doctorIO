/* eslint-disable no-unused-vars */
import QueueItem from '@components/appointments_queue/components/queue_item';
import { useState } from 'react';
import './style/index.scss';
import ScrollView from '@components/scroll_view';
import { useScroller } from '@libs/hooks/useScroller';
import QueueControls from '@components/queue_controls';
import { color } from '@assets/styles/color';
import TextButton from '@components/buttons/text_button';
import Backdrop from '@components/backdrop';
import Header from '@components/header';
import { resumeAppointmentQueue } from '@redux/instance/appointmentQueue/appointmentQueueSlice';
import { useDispatch } from 'react-redux';
import { useGetQueueInfoQuery } from '@redux/instance/appointmentQueue/AppointmentQueueApi';
import { AppointmentQueue } from '@models/instance.model';
import LoadingSpinner from '@components/loading_spinner';
import { parseISO } from 'date-fns';

interface AppointmentQueueSmallProps {}

export default function AppointmentQueueSmall({}: AppointmentQueueSmallProps) {
  const dispatch = useDispatch();
  const { isLoading, data, isError, isSuccess } = useGetQueueInfoQuery(1);

  const [selected, setSelected] = useState(-1);
  const { ref, gotoFrom } = useScroller(10);

  return isLoading ? (
    <LoadingSpinner />
  ) : isSuccess ? (
    (() => {
      const { state, appointments, isOwner } = data as AppointmentQueue;
      return (
        <div className="appointment-queue-small">
          <Header title="Queue list" buttonNode={<QueueControls />} />
          <div className="queue-items">
            {
              appointments.length > 0 ? (
                <Backdrop
                  when={state === 'PAUSED' ? (isOwner ? 'blur' : true) : false}
                  backdropItems={
                    <>
                      <span css={{ fontSize: 14 }}>
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
                            dispatch(resumeAppointmentQueue());
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
                          { date, patientId, patientName, test, position },
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
                              timeAgo={parseISO(date as any as string)}
                              diagnosis={test}
                              opened={selected == index}
                            />
                          </div>
                        ),
                      )}
                  </ScrollView>
                </Backdrop>
              ) : (
                <span>IDLE</span>
              ) //UI: add good comp
            }
          </div>
        </div>
      );
    })()
  ) : (
    <div>Error</div>
  );
}
