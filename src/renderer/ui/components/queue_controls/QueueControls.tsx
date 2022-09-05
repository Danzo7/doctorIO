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
import {
  useGetIsQueueOwnerQuery,
  useGetQueueStateQuery,
  usePauseQueueMutation,
  useResumeQueueMutation,
} from '@redux/instance/appointmentQueue/AppointmentQueueApi';
import { AppointmentQueue } from '@models/instance.model';

interface QueueControlsProps {}
export default function QueueControls({}: QueueControlsProps) {
  const { open, close } = useOverlay();
  const queueStateQuery = useGetQueueStateQuery();
  const isQueueOwnerQuery = useGetIsQueueOwnerQuery();
  const [PauseQueue] = usePauseQueueMutation();
  const [ResumeQueue] = useResumeQueueMutation();

  let isOwner: boolean;
  let state;
  if (queueStateQuery.isSuccess && isQueueOwnerQuery.isSuccess) {
    isOwner = isQueueOwnerQuery.data;
    state = (queueStateQuery.data as AppointmentQueue).state;

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
                    title="You are going to resume the Queue"
                    description="Allowed members will be able to add to the Queue again"
                  >
                    <TextButton
                      text="Resume"
                      backgroundColor={color.good_green}
                      width="100%"
                      onPress={() => {
                        //REDUX change the role id for the fetch
                        ResumeQueue(1);
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
                  open(<NextPatient />, {
                    width: '30%',
                    closeOnClickOutside: true,
                    isDimmed: true,
                    clickThrough: false,
                    closeBtn: 'inner',
                  });
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
                      title="Are you sure you want to pause?"
                      description="By pausing the queue no more patient will be accepted"
                    >
                      <TextButton
                        text="Confirm"
                        backgroundColor={color.hot_red}
                        width="100%"
                        onPress={() => {
                          //REDUX change the role id for the fetch
                          PauseQueue(1);
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
//UI provide good comp for error
