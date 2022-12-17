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
import EyePassword from '@components/buttons/eye_password';

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
  const [showOldPass, setShowOldPass] = useState(false);
  const [showNewPass, setShowNewPass] = useState(false);
  const [showConfirmPass, setShowConfirmPass] = useState(false);
  const onSubmit: SubmitHandler<Inputs> = ({
    oldSecretKey,
    newSecretKey,
    repeatSecretKey,
  }) => {
    if (newSecretKey == repeatSecretKey)
      UpdateMemberSecretMutation({
        oldSecret: oldSecretKey,
        newSecret: newSecretKey,
      }).then((result) => {
        if ('data' in result) {
          Overlay_u.close();
        } else {
          const castedErr = (result.error as any)?.data as ServerError;
          if (castedErr?.errorCode == 1000)
            setError('The old secret key is incorrect');
          else setError('An error occurred, please try again');
        }
      });
    else {
      setError("secret keys don't match each other");
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
              type={showOldPass ? 'text' : 'password'}
              label="Old secret key"
              name="oldSecretKey"
              trailing={
                <EyePassword
                  value={showOldPass}
                  onPress={() => {
                    setShowOldPass(!showOldPass);
                  }}
                />
              }
              fillContainer
            />
            <Input
              type={showNewPass ? 'text' : 'password'}
              label="New secret key"
              name="newSecretKey"
              fillContainer
              trailing={
                <EyePassword
                  value={showNewPass}
                  onPress={() => {
                    setShowNewPass(!showNewPass);
                  }}
                />
              }
              onChange={() => {
                if (internalError.length > 0) setError('');
              }}
            />
            <Input
              type={showConfirmPass ? 'text' : 'password'}
              label="Repeat secret key"
              name="repeatSecretKey"
              trailing={
                <EyePassword
                  value={showConfirmPass}
                  onPress={() => {
                    setShowConfirmPass(!showConfirmPass);
                  }}
                />
              }
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
