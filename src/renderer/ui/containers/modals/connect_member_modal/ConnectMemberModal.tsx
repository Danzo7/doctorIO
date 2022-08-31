import Input from '@components/inputs/input';
import Key from 'toSvg/key.svg?icon';
import TextButton from '@components/buttons/text_button';
import { color } from '@assets/styles/color';
import ModalContainer from '@components/modal_container';
import { SubmitHandler, useForm } from 'react-hook-form';
import { parseInviteKey } from '@helpers/crypto/parse';
import { useAppDispatch, useAppSelector } from '@store';
import { useState } from 'react';
import { Overlay } from '@libs/overlay';
import { useConnectMemberMutation } from '@redux/local/auth/authApi';
interface Inputs {
  key: string;
}
interface ConnectMemberModalProps {}
export default function ConnectMemberModal({}: ConnectMemberModalProps) {
  const dispatch = useAppDispatch();
  const userInfo = useAppSelector((state) => state.user);
  const [ConnectMember, result] = useConnectMemberMutation();
  const { control, handleSubmit, setValue, getValues } = useForm<{
    key: string;
  }>({
    mode: 'onSubmit',
  });
  const onSubmit: SubmitHandler<Inputs> = ({ key }) => {
    console.log(key);
    let memId;
    if (userInfo.selectedClinic) {
      memId = userInfo.clinic[userInfo.selectedClinic].memberId;
      ConnectMember({ memberId: memId, secretKey: key }).then(() => {
        if (result.isSuccess) {
          Overlay.close();
        }
      });
    }
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
