import Input from '@components/inputs/input';
import Key from 'toSvg/key.svg?icon';
import TextButton from '@components/buttons/text_button';
import { color } from '@assets/styles/color';
import ModalContainer from '@components/modal_container';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useRegisterMutation } from '@redux/local/auth/authApi';
import { parseInviteKey } from '@helpers/crypto/parse';
import { useState } from 'react';
import { nanoid } from '@reduxjs/toolkit';
import LoadingSpinner from '@components/loading_spinner';
import CopyField from '@components/copy_field';
import { useUserStore } from '@stores/userStore';
import { useConnectionStore } from '@stores/ConnectionStore';
import { modal } from '@libs/overlay';
interface Inputs {
  key: string;
}
interface JoinNewClinicModalProps {}
export default function JoinNewClinicModal({}: JoinNewClinicModalProps) {
  const [register, { data, isError, isLoading, error, isSuccess }] =
    useRegisterMutation();
  const user = useUserStore();
  const { control, handleSubmit, reset } = useForm<{
    key: string;
  }>({
    mode: 'onSubmit',
    defaultValues: { key: '' },
  });
  const serverError = isError
    ? ((error as any)?.data?.message as ServerError)
    : undefined;
  const [internalError, setError] = useState('');
  const onSubmit: SubmitHandler<Inputs> = async ({ key }) => {
    let location;
    try {
      location =
        key.length > 0 ? parseInviteKey(key).location : '127.0.0.1:3000';
    } catch (e: any) {
      setError("Couldn't parse invite key");
      reset();
    }
    if (location) {
      useConnectionStore.getState().pseudoConnect(location);
      register({
        invKey: key,
        body: {
          name: user.firstName + ' ' + user.lastName,
          age: user.age ?? 0,
          gender: user.gender ?? 'male',
          userId: nanoid(),
          address: 'address',
          //     phone: userinfo.phone,
          publicKey: user.publicKey,
        },
      });
    }
  };
  return (
    <ModalContainer
      onSubmit={handleSubmit(onSubmit)}
      title="Join a new clinic"
      controls={
        !isSuccess ? (
          <TextButton
            text="Join"
            backgroundColor={color.good_green}
            fontSize={13}
            fontWeight={700}
            width="100%"
            padding={5}
            blank
          />
        ) : (
          <TextButton
            text="Close"
            backgroundColor={color.good_green}
            fontSize={13}
            fontWeight={700}
            alignSelf="center"
            padding={5}
            onPress={() => {
              modal.close();
            }}
          />
        )
      }
    >
      {isLoading ? (
        <LoadingSpinner />
      ) : isSuccess && data ? (
        <CopyField text={data.secretKey} />
      ) : (
        <Input
          name="key"
          control={control}
          onChange={() => {
            if (internalError.length > 0) setError('');
          }}
          errorMessage={
            internalError.length > 0 ? internalError : serverError?.message
          }
          leading={<Key />}
          type="text"
          hint="The invite key should be provided by a clinic member"
        />
      )}
    </ModalContainer>
  );
}
