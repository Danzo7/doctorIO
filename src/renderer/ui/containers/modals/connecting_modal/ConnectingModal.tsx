import SquareIconButton from '@components/buttons/square_icon_button/SquareIconButton';
import LoadingSpinner from '@components/loading_spinner';
import VerticalPanel from '@components/vertical_panel';
import { DEFAULT_MODAL } from '@libs/overlay';
import { useConnectionStore } from '@stores/ConnectionStore';
import { modal } from '@stores/overlayStore';
import LogOut from 'toSvg/logOut.svg?icon';
import AlertModal from '../dialog_modal';
import TextButton from '@components/buttons/text_button';
import { color } from '@assets/styles/color';

interface ConnectingModalProps {
  status: 'connecting' | 'unreachable';
}
export default function ConnectingModal({ status }: ConnectingModalProps) {
  const { stop, disconnect } = useConnectionStore();
  return (
    <VerticalPanel
      title="Connecting"
      backgroundColor={color.secondary_color}
      description={
        status == 'connecting'
          ? 'Trying to connect. Hang tight!'
          : 'server is not responding. make sure the server is running.'
      }
      Icon={<LoadingSpinner />}
      action={
        status == 'unreachable'
          ? {
              text: 'Change location',
              onClick: stop,
            }
          : undefined
      }
      IconBtn={
        <SquareIconButton
          tip="Disconnect"
          Icon={LogOut}
          onPress={() =>
            modal(
              <AlertModal
                title="Are you sure?"
                description="You will be disconnected from the server"
                status="warning"
                controls={
                  <>
                    <TextButton
                      text="Confirm"
                      onPress={disconnect}
                      backgroundColor={color.hot_red}
                    />
                    <TextButton text="Cancel" afterBgColor={color.light} />
                  </>
                }
              />,
              DEFAULT_MODAL,
            ).open()
          }
        />
      }
    />
  );
}
