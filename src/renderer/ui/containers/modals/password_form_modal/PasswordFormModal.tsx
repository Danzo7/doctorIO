import { color } from '@assets/styles/color';
import TextButton from '@components/buttons/text_button';
import Input, { Inputix } from '@components/inputs/input/Input';
import ModalContainer from '@components/modal_container';
import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';
import './style/index.scss';
import EyePassword from '@components/buttons/eye_password';
import { useState } from 'react';

const registrationSchema = z.object({
  password: z.string().min(1, 'The password is required'),
  repeatPassword: z.string().min(1, 'Repeat the password'),
});
const updateSchema = z.object({
  oldPassword: z.string().min(1, 'Old password is required'),
  newPassword: z.string().min(1, 'New password is required'),
  repeatNewPassword: z.string().min(1, 'New password is required'),
});
type RegistrationInputs = z.infer<typeof registrationSchema>;
type UpdateInputs = z.infer<typeof updateSchema>;
type Inputs = RegistrationInputs | UpdateInputs;
interface PasswordFormModalProps {
  registration: boolean;
}
export default function PasswordFormModal({
  registration,
}: PasswordFormModalProps) {
  const [showOldPass, setShowOldPass] = useState(false);
  const [showNewPass, setShowNewPass] = useState(false);
  const [showConfirmPass, setShowConfirmPass] = useState(false);
  const { control, handleSubmit } = useForm<Inputs>({
    mode: 'onChange',
    resolver: registration
      ? zodResolver(registrationSchema)
      : zodResolver(updateSchema),
    defaultValues: registration
      ? { password: '', repeatPassword: '' }
      : {
          oldPassword: '',
          newPassword: '',
          repeatNewPassword: '',
        },
  });

  const onSubmit: SubmitHandler<Inputs> = (formData) => {
    console.log('🚀 ~ file: PasswordFormModal.tsx:42 ~ formData', formData);
    //TODO handle submit
  };

  return (
    <ModalContainer
      title={registration ? 'Register your password' : 'Updating password'}
      onSubmit={handleSubmit(onSubmit)}
      controls={
        <div className="update-controls-div">
          <TextButton
            text={registration ? 'Save' : 'Update'}
            backgroundColor={color.good_green}
            fontSize={14}
            fontWeight={700}
            width={'100%'}
            blank
            type="submit"
          />
          {!registration ? (
            <span>
              Note: You will be asked to provide the new password the next time
              you launch the software.
            </span>
          ) : (
            <span>
              Note: You can skip this step and set the password later.
              <span onClick={() => {}}> Skip</span>
            </span>
          )}
        </div>
      }
    >
      <div className="update-input-div">
        {registration ? (
          <Inputix control={control}>
            <Input
              type={showNewPass ? 'text' : 'password'}
              label="The password"
              name="password"
              fillContainer
              trailing={
                <EyePassword
                  value={showNewPass}
                  onPress={() => {
                    setShowNewPass(!showNewPass);
                  }}
                />
              }
            />
            <Input
              type={showConfirmPass ? 'text' : 'password'}
              label="Repeat the password"
              name="repeatPassword"
              fillContainer
              trailing={
                <EyePassword
                  value={showConfirmPass}
                  onPress={() => {
                    setShowConfirmPass(!showConfirmPass);
                  }}
                />
              }
            />
          </Inputix>
        ) : (
          <Inputix control={control}>
            <Input
              type={showOldPass ? 'text' : 'password'}
              label="Old password"
              name="oldPassword"
              fillContainer
              trailing={
                <EyePassword
                  value={showOldPass}
                  onPress={() => {
                    setShowOldPass(!showOldPass);
                  }}
                />
              }
            />
            <Input
              type={showNewPass ? 'text' : 'password'}
              label="New password"
              name="newPassword"
              fillContainer
              trailing={
                <EyePassword
                  value={showNewPass}
                  onPress={() => {
                    setShowNewPass(!showNewPass);
                  }}
                />
              }
            />
            <Input
              type={showConfirmPass ? 'text' : 'password'}
              label="Repeat the new password"
              name="repeatNewPassword"
              fillContainer
              trailing={
                <EyePassword
                  value={showConfirmPass}
                  onPress={() => {
                    setShowConfirmPass(!showConfirmPass);
                  }}
                />
              }
            />
          </Inputix>
        )}
      </div>
    </ModalContainer>
  );
}
