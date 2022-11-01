import Input from '@components/inputs/input';
import Key from 'toSvg/key.svg?icon';
import TextButton from '@components/buttons/text_button';
import { color } from '@assets/styles/color';
import ModalContainer from '@components/modal_container';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Overlay } from '@libs/overlay';
import { useConnectMemberMutation } from '@redux/local/auth/authApi';
import useNavigation from '@libs/hooks/useNavigation';
import { useClinicsStore } from '@stores/clinicsStore';
import { useConnectionStore } from '@stores/ConnectionStore';
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

  const [ConnectMember] = useConnectMemberMutation();
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
      }
    });

    Overlay.close();
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
      />
    </ModalContainer>
  );
}
