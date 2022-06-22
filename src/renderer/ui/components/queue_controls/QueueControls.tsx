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

interface OwnerRoleProps {
  onCallNext?: () => void;
  onPause?: () => void;
}
interface AssistanceRoleProps {
  onAdd?: () => void;
}
interface QueueControlsProps {
  role:
    | { roleName: 'owner'; roleProps: OwnerRoleProps }
    | { roleName: 'assistance'; roleProps?: AssistanceRoleProps };
}
export default function QueueControls({ role }: QueueControlsProps) {
  const { open, close } = useOverlay();
  return (
    <>
      {role.roleName == 'owner' ? (
        <div className="queue-controls">
          <IconicButton
            Icon={NextIcon}
            backgroundColor={color.good_green}
            width={25}
            radius={7}
            iconSize={10}
            onPress={() => {
              open(<NextPatient patientName="Aymen Daouadji" position={15} />, {
                width: '30%',
                closeOnClickOutside: true,
                isDimmed: true,
                clickThrough: false,
                closeBtn: 'inner',
              });
              if (role.roleProps.onCallNext) role.roleProps?.onCallNext();
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
              if (role.roleProps.onPause) role.roleProps?.onPause();
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
      )}
    </>
  );
}
