import Input from '@components/inputs/input';
import Key from 'toSvg/key.svg?icon';
import TextButton from '@components/buttons/text_button';
import { color } from '@assets/styles/color';
import ModalContainer from '@components/modal_container';
import { SubmitHandler, useForm } from 'react-hook-form';
import { fakeInvKey } from '@api/fake';
import { useRegisterMutation } from '@redux/local/auth/authApi';
import { parseInviteKey } from '@helpers/crypto/parse';
import { useAppDispatch, useAppSelector } from '@store';
import { addNewClinic } from '@redux/local/user/userSlice';
import { useState } from 'react';
import { Overlay } from '@libs/overlay';
interface Inputs {
  key: string;
}
interface JoinNewClinicModalProps {}
export default function JoinNewClinicModal({}: JoinNewClinicModalProps) {
  const dispatch = useAppDispatch();
  const [showCopyBtn, setShowCopyBtn] = useState(false);
  const [register, result] = useRegisterMutation();
  const userinfo = useAppSelector((state) => state.user);
  const { control, handleSubmit, setValue, getValues } = useForm<{
    key: string;
  }>({
    mode: 'onSubmit',
  });
  const onSubmit: SubmitHandler<Inputs> = ({ key }) => {
    console.log(key);
    const { id, location } = parseInviteKey(key);
    register({
      invKey: key ?? undefined,
      body: {
        name: userinfo.firstName + ' ' + userinfo.lastName,
        age: 18,
        gender: 'male',
        userId: userinfo.userId!.toString(),
        address: 'address',
        phone: userinfo.phone,
        publicKey: userinfo.publicKey,
      },
    }).then(() => {
      if (result.isSuccess) {
        dispatch(
          addNewClinic({ memberId: result.data.id, serverLocation: location }),
        );
        setValue('key', result.data.secretKey);
        setShowCopyBtn(true);
        Overlay.close();
      }
    });

    console.log('result :', result);
  };
  return (
    <ModalContainer
      onSubmit={handleSubmit(onSubmit)}
      title="Join a new clinic"
      controls={
        <TextButton
          text="Join"
          backgroundColor={color.good_green}
          fontSize={13}
          fontWeight={700}
          alignSelf="center"
          padding={5}
          blank
        />
      }
    >
      <Input
        name="key"
        control={control}
        leading={<Key />}
        trailing={
          showCopyBtn ? (
            <TextButton
              text="Copy"
              backgroundColor={color.cold_blue}
              fontSize={13}
              fontWeight={700}
              alignSelf="center"
              padding={5}
              onPress={() => {
                navigator.clipboard.writeText(getValues().key);
              }}
            />
          ) : undefined
        }
        type="text"
        hint="The invite key should be provided by a clinic member"
      />
    </ModalContainer>
  );
}
