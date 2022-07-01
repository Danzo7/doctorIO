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
import { appointmentQueueData } from '@api/fake';

interface QueueControlsProps {
  isOwner?: boolean;
  isPaused: boolean;
}
export default function QueueControls({
  isOwner,
  isPaused,
}: QueueControlsProps) {
  const { open, close } = useOverlay();
  return (
    <>
      {!(isPaused && !isOwner) &&
        (isPaused ? (
          <IconicButton
            Icon={NextIcon}
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
                      //REDUX change the state of isPaused to resume
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
        ) : isOwner ? (
          <div className="queue-controls">
            <IconicButton
              Icon={NextIcon}
              backgroundColor={color.good_green}
              width={25}
              radius={7}
              iconSize={10}
              onPress={() => {
                open(
                  <NextPatient
                    patientName={
                      appointmentQueueData.appointments[0].patientName
                    }
                    position={appointmentQueueData.appointments[0].position}
                  />,
                  {
                    width: '30%',
                    closeOnClickOutside: true,
                    isDimmed: true,
                    clickThrough: false,
                    closeBtn: 'inner',
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
                        //REDUX  //REDUX change the state of queue (pause)
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
}
