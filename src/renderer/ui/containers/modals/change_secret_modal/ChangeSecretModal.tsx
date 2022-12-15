import { color } from '@assets/styles/color';
import TextButton from '@components/buttons/text_button';
import Input, { Inputix } from '@components/inputs/input/Input';
import ModalContainer from '@components/modal_container';
import { zodResolver } from '@hookform/resolvers/zod';
import { useUpdateMemberSecretMutation } from '@redux/clinic/rbac/member/memberApi';
import { Overlay_u } from '@stores/overlayStore';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';
import './style/index.scss';

const schema = z.object({
  oldSecretKey: z.string().min(1, 'Old Secret Key is required'),
  newSecretKey: z.string().min(1, 'New Secret Key is required'),
  repeatSecretKey: z.string().min(1, 'New Secret Key is required'),
});
type Inputs = z.infer<typeof schema>;
interface ChangeSecretModalProps {}
export default function ChangeSecretModal({}: ChangeSecretModalProps) {
  const { control, handleSubmit } = useForm<Inputs>({
    mode: 'onChange',
    resolver: zodResolver(schema),
    defaultValues: {
      oldSecretKey: '',
      newSecretKey: '',
      repeatSecretKey: '',
    },
  });
  const [UpdateMemberSecretMutation] = useUpdateMemberSecretMutation();
  const [internalError, setError] = useState('');
  const onSubmit: SubmitHandler<Inputs> = ({
    oldSecretKey,
    newSecretKey,
    repeatSecretKey,
  }) => {
    if (newSecretKey == repeatSecretKey)
      UpdateMemberSecretMutation({
        oldSecret: oldSecretKey,
        newSecret: newSecretKey,
      }).then((result: any) => {
        if (result.data) {
          Overlay_u.close();
        } else {
          const castedErr = (result.error as any)?.data as ServerError;
          if (castedErr?.errorCode == 1200) {
            setError(castedErr?.message);
          }
        }
      });
    else {
      setError("Secret Key confirmation doesn't match the password");
    }
  };
  return (
    <div className="update-controls-div">
      <ModalContainer
        title="Updating secret key"
        onSubmit={handleSubmit(onSubmit)}
        controls={
          <div className="update-controls-div">
            <TextButton
              text="Update"
              backgroundColor={color.good_green}
              fontSize={14}
              fontWeight={700}
              width={'100%'}
              blank
              type="submit"
            />
            <span>
              Note: updating the secret key will only affect the current clinic.
            </span>
          </div>
        }
      >
        <div className="update-input-div">
          <Inputix control={control}>
            <Input
              type="text"
              label="Old secret key"
              name="oldSecretKey"
              fillContainer
            />
            <Input
              type="text"
              label="New secret key"
              name="newSecretKey"
              fillContainer
              onChange={() => {
                if (internalError.length > 0) setError('');
              }}
            />
            <Input
              type="text"
              label="Repeat secret key"
              name="repeatSecretKey"
              fillContainer
              onChange={() => {
                if (internalError.length > 0) setError('');
              }}
            />
          </Inputix>
          <span className="error-span">{internalError}</span>
        </div>
      </ModalContainer>
    </div>
  );
}
