import Input from '@components/inputs/input';
import Key from 'toSvg/key.svg?icon';
import TextButton from '@components/buttons/text_button';
import { color } from '@assets/styles/color';
import ModalContainer from '@components/modal_container';
import { SubmitHandler, useForm } from 'react-hook-form';
import {
  useGetHelloMutation,
  useRegisterMutation,
} from '@redux/local/auth/authApi';
import { parseInviteKey } from '@helpers/crypto/parse';
import { useAppDispatch, useAppSelector } from '@store';
import { addNewClinic } from '@redux/local/user/userSlice';
import { useRef } from 'react';
import { Overlay } from '@libs/overlay';
import { nanoid } from '@reduxjs/toolkit';
import LoadingSpinner from '@components/loading_spinner';
import { ServerError } from '@models/instance.model';
import CopyField from '@components/copy_field';
import { StaticQueries } from '@redux/dynamic_queries';
interface Inputs {
  key: string;
}
interface JoinNewClinicModalProps {}
export default function JoinNewClinicModal({}: JoinNewClinicModalProps) {
  const dispatch = useAppDispatch();
  const [register, { data, isError, isLoading, error, isSuccess }] =
    useRegisterMutation();
  const [hello] = useGetHelloMutation();
  const userinfo = useAppSelector((state) => state.user);
  const { control, handleSubmit, reset } = useForm<{
    key: string;
  }>({
    mode: 'onSubmit',
  });
  const errorMsg = isError
    ? ((error as any)?.data?.message as ServerError)
    : undefined;
  const internalErrorRef = useRef<string>(); //FEATURE improve internal error handling
  const isFetching = useRef(false);
  const onSubmit: SubmitHandler<Inputs> = async ({ key }) => {
    isFetching.current = true;
    try {
      const location =
        key && key.length > 0 ? parseInviteKey(key).location : '127.0.0.1:3000';
      await StaticQueries.authQuery.setUrl(location);
      register({
        invKey: key,
        body: {
          name: userinfo.firstName + ' ' + userinfo.lastName,
          age: 18,
          gender: 'male',
          userId: nanoid(),
          address: 'address',
          //phone: userinfo.phone,
          publicKey: userinfo.publicKey,
        },
      }).then(() => {
        isFetching.current = false;
      });
    } catch (e: any) {
      internalErrorRef.current = e;
      reset();
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
            alignSelf="center"
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
              Overlay.close();
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
          errorMessage={
            internalErrorRef?.current ??
            (Array.isArray(errorMsg) ? errorMsg[0] : errorMsg)
          }
          leading={<Key />}
          type="text"
          hint="The invite key should be provided by a clinic member"
        />
      )}
    </ModalContainer>
  );
}
