/* eslint-disable react/jsx-no-undef */
import { color } from '@assets/styles/color';
import TextButton from '@components/buttons/text_button';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import LogOut from 'toSvg/logOut.svg?icon';
import Input from '@components/inputs/input';
import { useClinicsStore } from '@stores/clinicsStore';
import { useConnectionStore } from '@stores/ConnectionStore';
import ModalContainer from '@components/modal_container';
import VerticalPanel from '@components/vertical_panel';
import LoadingSpinner from '@components/loading_spinner';
import SquareIconButton from '@components/buttons/square_icon_button/SquareIconButton';
import AlertModal from '../dialog_modal';
import ErrorPanel from '@components/error_panel';
import { useState } from 'react';
const schema = z.object({
  ip: z
    .string()
    .regex(
      /^(?:[0-9]{1,3}\.){3}[0-9]{1,3}$/,
      'Please enter a valid IP address',
    ),
});
export default function NetworkError() {
  const { status, disconnect, stop, reconnect } = useConnectionStore();
  const clinicStore = useClinicsStore();
  const { control, handleSubmit } = useForm<{ ip: string }>({
    resolver: zodResolver(schema),
  });
  const [confirmLogout, setConfirmLogout] = useState(false);
  return confirmLogout ? (
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
            onPress={() => setConfirmLogout(false)}
            afterBgColor={color.light}
          />
        </>
      }
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
              onPress={() => setConfirmLogout(true)}
            />
          }
        />
      )}
      {status == 'stopped' && (
        <ModalContainer
          title={'Change server location'}
          controls={
            <TextButton
              backgroundColor={color.cold_blue}
              onPress={handleSubmit((data) => {
                clinicStore.setCurrentLocation(data.ip + ':3000');
                reconnect();
              })}
              text="Update"
              width={'100%'}
            />
          }
        >
          {clinicStore.hasSelectedClinic() ? (
            <Input
              control={control}
              hint="The server IP address of can be retrieved from a connected devices"
              name="ip"
              label="IP address"
              type="text"
              defaultValue={clinicStore
                .getSelectedClinic()
                .serverLocation.replace(':3000', '')}
            />
          ) : (
            <ErrorPanel />
          )}
        </ModalContainer>
      )}
      {status == 'locked' && (
        <AlertModal
          title="Account is Locked"
          description="To unlock your account, you must provide your secret key"
          status="warning"
          controls={
            <>
              <TextButton text="Unlock" backgroundColor={color.good_green} />
              <TextButton
                text="Disconnect"
                backgroundColor={color.hot_red}
                onPress={() => setConfirmLogout(true)}
              />
            </>
          }
        />
      )}
    </>
  );
}
