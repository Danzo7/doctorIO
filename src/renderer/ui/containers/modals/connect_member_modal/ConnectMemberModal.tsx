import Input from '@components/inputs/input';
import Key from 'toSvg/key.svg?icon';
import TextButton from '@components/buttons/text_button';
import { color } from '@assets/styles/color';
import ModalContainer from '@components/modal_container';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useAppDispatch, useAppSelector } from '@store';
import { Overlay } from '@libs/overlay';
import { useConnectMemberMutation } from '@redux/local/auth/authApi';
import { setTokens } from '@redux/local/auth/authSlice';
import { connect } from '@redux/local/connectionStateSlice';
import { StaticQueries } from '@redux/dynamic_queries';
import useNavigation from '@libs/hooks/useNavigation';
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
  const dispatch = useAppDispatch();
  const userInfo = useAppSelector((state) => state.user);
  const [ConnectMember] = useConnectMemberMutation();
  const { control, handleSubmit } = useForm<{
    key: string;
  }>({
    mode: 'onSubmit',
    defaultValues: { key: '' },
  });
  const onSubmit: SubmitHandler<Inputs> = async ({ key }) => {
    const memId = userInfo.clinic[selectedIndex].memberId;
    const location = userInfo.clinic[selectedIndex].serverLocation;
    await StaticQueries.authQuery.setUrl(location);
    ConnectMember({ memberId: memId, secretKey: key }).then((result: any) => {
      if (result.data) {
        // setSelectedServer(selectedIndex);

        dispatch(
          setTokens({
            accessToken: result.data?.access_token,
            refreshToken: result.data?.refresh_token,
          }),
        );
        connect(dispatch, selectedIndex);
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
