import { color } from '@assets/styles/color';
import IconicButton from '@components/buttons/iconic_button';
import NextIcon from 'toSvg/next.svg?icon';
import PauseIcon from 'toSvg/pause.svg?icon';
import AddIcon from 'toSvg/add.svg?icon';
import ResetIcon from 'toSvg/reset.svg?icon';
import './style/index.scss';
import NextPatient from '@containers/modals/next_patient';
import TextButton from '@components/buttons/text_button';
import QueueAddSearchModal from '@containers/modals/queue_add_search_modal';
import playIcon from 'toSvg/play.svg?icon';
import { FIT_MODAL } from '@libs/overlay';
import {
  usePauseQueueMutation,
  useResetQueueMutation,
  useResumeQueueMutation,
} from '@redux/instance/appointmentQueue/AppointmentQueueApi';
import { QueueState } from '@models/instance.model';
import AlertModal from '@containers/modals/dialog_modal';
import { modal } from '@stores/overlayStore';

interface QueueControlsProps {
  state: QueueState['state'];
  isOwner: boolean;
}
export default function QueueControls({ state, isOwner }: QueueControlsProps) {
  const [PauseQueue] = usePauseQueueMutation();
  const [ResumeQueue] = useResumeQueueMutation();
  const [resetQueue] = useResetQueueMutation();
  return (
    <div className="queue-controls">
      {state !== 'PAUSED' && (
        <IconicButton
          tip="Add a patient"
          Icon={AddIcon}
          backgroundColor={color.cold_blue}
          width={25}
          radius={5}
          iconSize={11}
          onPress={() => {
            modal(<QueueAddSearchModal />, {
              closeOnClickOutside: true,
              isDimmed: true,
              clickThrough: false,
              closeBtn: 'inner',
              width: '30%',
            }).open();
          }}
        />
      )}
      {state === 'EMPTY' && (
        <IconicButton
          tip="Restart queue"
          Icon={ResetIcon}
          backgroundColor={color.hot_purple}
          width={25}
          radius={5}
          iconSize={14}
          onPress={() => {
            modal(
              <AlertModal
                title="Are you sure you want to reset the queue count ? "
                description="By applying the reset, the queue count will start from zero. "
                status="warning"
                controls={
                  <>
                    <TextButton
                      text="Cancel"
                      backgroundColor={color.cold_blue}
                      onPress={() => {
                        close();
                      }}
                    />
                    <TextButton
                      text="Confirm"
                      backgroundColor={color.hot_red}
                      onPress={() => {
                        resetQueue();
                        close();
                      }}
                    />
                  </>
                }
              ></AlertModal>,

              {
                closeOnClickOutside: true,
                isDimmed: true,
                clickThrough: false,
              },
            ).open();
          }}
        />
      )}
      {isOwner &&
        (state == 'PAUSED' ? (
          <IconicButton
            tip="Resume queue"
            Icon={playIcon}
            backgroundColor={color.cold_blue}
            width={25}
            radius={5}
            iconSize={10}
            onPress={() => {
              modal(
                <AlertModal
                  title="You are going to resume the Queue"
                  description="Allowed members will be able to add to the Queue again"
                  status="warning"
                  controls={
                    <TextButton
                      text="Resume"
                      backgroundColor={color.good_green}
                      onPress={() => {
                        ResumeQueue();
                        close();
                      }}
                    />
                  }
                ></AlertModal>,
                FIT_MODAL,
              ).open();
            }}
          />
        ) : (
          <>
            {state != 'EMPTY' && (
              <IconicButton
                tip="Next patient"
                Icon={NextIcon}
                backgroundColor={color.good_green}
                width={25}
                radius={7}
                iconSize={10}
                onPress={() => {
                  modal(<NextPatient />, {
                    width: '30%',
                    closeOnClickOutside: true,
                    isDimmed: true,
                    clickThrough: false,
                    closeBtn: 'inner',
                  }).open();
                }}
              />
            )}
            <IconicButton
              tip="Pause queue"
              Icon={PauseIcon}
              backgroundColor={color.hot_red}
              width={25}
              radius={7}
              iconSize={10}
              onPress={() => {
                modal(
                  <AlertModal
                    title="Are you sure you want to pause?"
                    description="By pausing the queue no more patient will be accepted"
                    status="warning"
                    controls={
                      <>
                        <TextButton
                          text="Cancel"
                          backgroundColor={color.cold_blue}
                          onPress={() => {
                            close();
                          }}
                        />
                        <TextButton
                          text="Confirm"
                          backgroundColor={color.hot_red}
                          onPress={() => {
                            PauseQueue();
                            close();
                          }}
                        />
                      </>
                    }
                  ></AlertModal>,
                  {
                    closeOnClickOutside: true,
                    isDimmed: true,
                    clickThrough: false,
                  },
                ).open();
              }}
            />
          </>
        ))}
    </div>
  );
}
