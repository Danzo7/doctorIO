import { color } from '@assets/styles/color';
import IconicButton from '@components/buttons/iconic_button';
import NextIcon from 'toSvg/next.svg?icon';
import PauseIcon from 'toSvg/pause.svg?icon';
import AddIcon from 'toSvg/add.svg?icon';
import './style/index.scss';
import { useOverlay } from '@libs/overlay/useOverlay';
import NextPatient from '@containers/modals/next_patient';
import WarningModal from '@containers/modals/warning_modal';
import TextButton from '@components/buttons/text_button';
import QueueAddSearchModal from '@containers/modals/queue_add_search_modal';
import playIcon from 'toSvg/play.svg?icon';
import { FIT_MODAL } from '@libs/overlay';
import { useDispatch } from 'react-redux';
import {
  pauseAppointmentQueue,
  resumeAppointmentQueue,
} from '@redux/instance/appointmentQueue/appointmentQueueSlice';
import { useAppSelector } from '@store';
import { useGetQueueInfoQuery } from '@redux/instance/appointmentQueue/AppointmentQueueApi';
import { AppointmentQueue } from '@models/instance.model';

interface QueueControlsProps {}
export default function QueueControls({}: QueueControlsProps) {
  const { open, close } = useOverlay();
  const { isLoading, data, isError, isSuccess } = useGetQueueInfoQuery(1);
  const dispatch = useDispatch();
  console.log(data);
  let isOwner: boolean;
  let state;
  if (isSuccess && data) {
    isOwner = (data as AppointmentQueue).isOwner;
    state = (data as AppointmentQueue).state;
    return (
      <>
        {!(state == 'PAUSED' && !isOwner) &&
          (state == 'PAUSED' ? (
            <IconicButton
              Icon={playIcon}
              backgroundColor={color.cold_blue}
              width={25}
              radius={7}
              iconSize={10}
              onPress={() => {
                open(
                  <WarningModal
                    warningTitle="You are going to resume the Queue"
                    warningDescription="Allowed members will be able to add to the Queue again"
                  >
                    <TextButton
                      text="Resume"
                      backgroundColor={color.good_green}
                      width="100%"
                      onPress={() => {
                        dispatch(resumeAppointmentQueue());
                        close();
                      }}
                    />
                  </WarningModal>,
                  FIT_MODAL,
                );
              }}
            />
          ) : isOwner ? (
            <div className="queue-controls">
              <IconicButton
                Icon={NextIcon}
                backgroundColor={color.good_green}
                width={25}
                radius={7}
                iconSize={10}
                onPress={() => {
                  let nextPatient:
                    | { patientName: string; position: number }
                    | undefined; //REDUX:use Query
                  if (nextPatient)
                    open(
                      <NextPatient
                        patientName={nextPatient.patientName}
                        position={nextPatient.position}
                      />,
                      {
                        width: '30%',
                        closeOnClickOutside: true,
                        isDimmed: true,
                        clickThrough: false,
                        closeBtn: 'inner',
                      },
                    );
                  else
                    open(
                      <WarningModal
                        warningTitle="The queue is empty for now "
                        warningDescription="You need to add patient to queue"
                      >
                        <TextButton
                          text="Close"
                          backgroundColor={color.cold_blue}
                          width="100%"
                          onPress={() => {
                            close();
                          }}
                        />
                      </WarningModal>,
                      {
                        closeOnClickOutside: true,
                        isDimmed: true,
                        clickThrough: false,
                      },
                    );
                }}
              />
              <IconicButton
                Icon={PauseIcon}
                backgroundColor={color.hot_red}
                width={25}
                radius={7}
                iconSize={10}
                onPress={() => {
                  open(
                    <WarningModal
                      warningTitle="Are you sure you want to pause?"
                      warningDescription="By pausing the queue no more patient will be accepted"
                    >
                      <TextButton
                        text="Confirm"
                        backgroundColor={color.hot_red}
                        width="100%"
                        onPress={() => {
                          if (isOwner) dispatch(pauseAppointmentQueue());
                          close();
                        }}
                      />
                    </WarningModal>,
                    {
                      closeOnClickOutside: true,
                      isDimmed: true,
                      clickThrough: false,
                      closeBtn: 'inner',
                    },
                  );
                }}
              />
            </div>
          ) : (
            <IconicButton
              Icon={AddIcon}
              backgroundColor={color.cold_blue}
              width={25}
              radius={7}
              iconSize={11}
              onPress={() => {
                open(<QueueAddSearchModal />, {
                  closeOnClickOutside: true,
                  isDimmed: true,
                  clickThrough: false,
                  closeBtn: 'inner',
                  width: '30%',
                });
              }}
            />
          ))}
      </>
    );
  } else return <div>error</div>;
}
