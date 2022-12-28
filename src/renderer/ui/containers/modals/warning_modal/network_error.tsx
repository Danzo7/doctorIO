/* eslint-disable react/jsx-no-undef */
import { color } from '@assets/styles/color';
import TextButton from '@components/buttons/text_button';
import LogOut from 'toSvg/logOut.svg?icon';
import { useClinicsStore } from '@stores/clinicsStore';
import { useConnectionStore } from '@stores/ConnectionStore';
import VerticalPanel from '@components/vertical_panel';
import LoadingSpinner from '@components/loading_spinner';
import SquareIconButton from '@components/buttons/square_icon_button/SquareIconButton';
import AlertModal from '../dialog_modal';
import ErrorPanel from '@components/error_panel';
import { useState } from 'react';
import ConnectMemberModal from '../connect_member_modal';
import UpdateIpModal from '../update_ip_modal';
import AccountLockedModal from '../account_locked_modal';

export default function NetworkError() {
  const { status, disconnect, stop } = useConnectionStore();
  const clinicStore = useClinicsStore();

  const [modalState, setModalState] = useState<'default' | 'logout' | 'unlock'>(
    'default',
  );
  const selected = clinicStore.getSelectedIndex();
  return selected == undefined ? (
    <ErrorPanel />
  ) : modalState === 'logout' ? (
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
          <TextButton
            text="Cancel"
            onPress={() => setModalState('default')}
            afterBgColor={color.light}
          />
        </>
      }
    />
  ) : modalState == 'unlock' ? (
    <ConnectMemberModal
      selectedIndex={selected}
      onCancel={() => setModalState('default')}
    />
  ) : (
    <>
      {(status === 'connecting' || status == 'unreachable') && (
        <VerticalPanel
          title="Connecting"
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
                  onClick: () => stop(),
                }
              : undefined
          }
          IconBtn={
            <SquareIconButton
              tip="Disconnect"
              Icon={LogOut}
              onPress={() => setModalState('logout')}
            />
          }
        />
      )}
      {status == 'stopped' && (
        <UpdateIpModal onCancel={() => setModalState('default')} />
      )}
      {status == 'locked' && (
        <AccountLockedModal onUnlock={() => setModalState('unlock')} />
      )}
    </>
  );
}
