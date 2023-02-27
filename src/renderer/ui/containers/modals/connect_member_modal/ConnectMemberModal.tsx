import Input from '@components/inputs/input';
import Key from 'toSvg/key.svg?icon';
import TextButton from '@components/buttons/text_button';
import { color } from '@assets/styles/color';
import ModalContainer from '@components/modal_container';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useConnectMemberMutation } from '@redux/local/auth/authApi';
import useNavigation from '@libs/hooks/useNavigation';
import { useClinicsStore } from '@stores/clinicsStore';
import { useConnectionStore } from '@stores/ConnectionStore';
import { useState } from 'react';
import { Overlay_u, modal } from '@stores/overlayStore';
import { DEFAULT_MODAL } from '@libs/overlay';
import UpdateIpModal from '../update_ip_modal';
interface Inputs {
  key: string;
}
interface ConnectMemberModalProps {
  selectedIndex: number;
  onCancel?: () => void;
}
export default function ConnectMemberModal({
  selectedIndex,
  onCancel,
}: ConnectMemberModalProps) {
  const { navigate } = useNavigation();
  const clinics = useClinicsStore();

  const [ConnectMember, res] = useConnectMemberMutation();
  const serverError = res.isError
    ? ((res.error as any)?.data?.message as ServerError)
    : undefined;
  const [internalError, setError] = useState<{
    message: string;
    errorCode: number;
  }>();
  const { control, handleSubmit } = useForm<{
    key: string;
  }>({
    mode: 'onSubmit',
    defaultValues: { key: '' },
  });
  const onSubmit: SubmitHandler<Inputs> = async ({ key }) => {
    const memId =
      useClinicsStore.getState().clinicData.clinics[selectedIndex].memberId;
    const location =
      useClinicsStore.getState().clinicData.clinics[selectedIndex]
        .serverLocation;
    useConnectionStore.getState().pseudoConnect(location);
    ConnectMember({ memberId: memId, secretKey: key }).then((result) => {
      if ('data' in result) {
        if (onCancel) useConnectionStore.getState().connected();
        else {
          clinics.setSelectedClinic(selectedIndex);
          useConnectionStore.getState().connect();
          navigate('/');
          Overlay_u.close();
        }
      } else {
        if ('data' in result.error) {
          const castedErr = result.error.data as ServerError;
          if (castedErr?.errorCode == 1000)
            setError({ message: 'Secret key is incorrect', errorCode: 1000 });
          else if (castedErr?.errorCode == 4001)
            setError({ message: 'Server is not responding', errorCode: 4001 });
        } else
          setError({
            message: 'something went wrong. please try again later',
            errorCode: -1,
          });
      }
    });
  };

  return (
    <ModalContainer
      onSubmit={handleSubmit(onSubmit)}
      title={onCancel ? 'Reconnect to clinic' : 'Connect to Clinic'}
      controls={
        <>
          <TextButton
            disabled={res.isLoading}
            text="Connect"
            backgroundColor={color.good_green}
            blank
            type="submit"
          />
          {onCancel && (
            <TextButton
              text="Cancel"
              backgroundColor={color.light}
              blank
              onPress={onCancel}
            />
          )}
          {internalError?.errorCode == 4001 && (
            <TextButton
              text="Change IP address"
              backgroundColor={color.light}
              blank
              onPress={() => {
                modal(
                  ({ close }) => (
                    <UpdateIpModal
                      onCancel={close}
                      selectedIndex={selectedIndex}
                      onConfirm={close}
                    />
                  ),
                  DEFAULT_MODAL,
                  'updateIpModal',
                ).open();
              }}
            />
          )}
        </>
      }
    >
      <Input
        name="key"
        control={control}
        leading={<Key />}
        disabled={res.isLoading}
        type="password"
        hint="please enter your secret key"
        onChange={() => {
          if (internalError?.message) setError(undefined);
        }}
        errorMessage={
          internalError ? internalError.message : serverError?.message
        }
      />
    </ModalContainer>
  );
}
