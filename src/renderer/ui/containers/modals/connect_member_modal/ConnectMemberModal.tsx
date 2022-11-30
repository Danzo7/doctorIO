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
import { Overlay_u } from '@stores/overlayStore';
interface Inputs {
  key: string;
}
interface ConnectMemberModalProps {
  selectedIndex: number;
}
export default function ConnectMemberModal({
  selectedIndex,
}: ConnectMemberModalProps) {
  const { navigate } = useNavigation();
  const clinics = useClinicsStore();

  const [ConnectMember, res] = useConnectMemberMutation();
  const serverError = res.isError
    ? ((res.error as any)?.data?.message as ServerError)
    : undefined;
  const [internalError, setError] = useState('');
  const { control, handleSubmit } = useForm<{
    key: string;
  }>({
    mode: 'onSubmit',
    defaultValues: { key: '' },
  });
  const onSubmit: SubmitHandler<Inputs> = async ({ key }) => {
    //TODO: If fail to connect to clinic, handle selected change and show error
    const memId =
      useClinicsStore.getState().clinicData.clinics[selectedIndex].memberId;
    const location =
      useClinicsStore.getState().clinicData.clinics[selectedIndex]
        .serverLocation;
    useConnectionStore.getState().pseudoConnect(location);
    ConnectMember({ memberId: memId, secretKey: key }).then((result: any) => {
      if (result.data) {
        clinics.setSelectedClinic(selectedIndex);
        useConnectionStore.getState().connect();
        navigate('/');
        Overlay_u.close();
      } else {
        const castedErr = (result.error as any)?.data as ServerError;
        if (castedErr?.errorCode == 1000) {
          setError('Wrong Secret key ');
        }
      }
    });
  };

  return (
    <ModalContainer
      onSubmit={handleSubmit(onSubmit)}
      title="Connect a member"
      controls={
        <TextButton
          text="Connect"
          backgroundColor={color.good_green}
          fontSize={13}
          fontWeight={700}
          alignSelf="center"
          padding={5}
          blank
          type="submit"
        />
      }
    >
      <Input
        name="key"
        control={control}
        leading={<Key />}
        type="text"
        hint="The Secret key is needed to connect"
        onChange={() => {
          if (internalError.length > 0) setError('');
        }}
        errorMessage={
          internalError.length > 0 ? internalError : serverError?.message
        }
      />
    </ModalContainer>
  );
}
