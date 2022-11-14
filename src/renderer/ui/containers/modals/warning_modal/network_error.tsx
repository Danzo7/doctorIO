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
import { useOverlay } from '@libs/overlay/useOverlay';
import AlertModal from '../dialog_modal';
import ErrorPanel from '@components/error_panel';
import { DEFAULT_MODAL } from '@libs/overlay';
const schema = z.object({
  ip: z
    .string()
    .regex(
      /^(?:[0-9]{1,3}\.){3}[0-9]{1,3}$/,
      'Please enter a valid IP address',
    ),
});
export default function NetworkError() {
  //TODO refactor the entire component
  const { status, disconnect, stop, reconnect } = useConnectionStore();
  const { open } = useOverlay();
  const clinicStore = useClinicsStore();
  const { control, handleSubmit } = useForm<{ ip: string }>({
    resolver: zodResolver(schema),
    defaultValues: { ip: '' },
  });

  return (
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
              Icon={LogOut}
              onPress={() =>
                open(
                  <AlertModal
                    title="Are you sure?"
                    description="You will be disconnected from the server"
                    status="warning"
                    controls={<TextButton text="Yes" onPress={disconnect} />}
                  />,
                  { ...DEFAULT_MODAL, style: { zIndex: 100 } },
                )
              }
            />
          }
        />
      )}
      {status == 'stopped' && (
        <ModalContainer title={'Change IP address'}>
          {clinicStore.hasSelectedClinic() ? (
            <Input
              control={control}
              name="ip"
              type="text"
              defaultValue={clinicStore
                .getSelectedClinic()
                .serverLocation.replace(':3000', '')}
              trailing={
                <TextButton
                  backgroundColor={color.cold_blue}
                  onPress={handleSubmit((data) => {
                    clinicStore.setCurrentLocation(data.ip + ':3000');
                    reconnect();
                  })}
                  text="Save"
                />
              }
            />
          ) : (
            <ErrorPanel />
          )}
        </ModalContainer>
      )}
    </>
  );
}
