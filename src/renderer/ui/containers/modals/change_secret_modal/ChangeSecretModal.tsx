import { color } from '@assets/styles/color';
import TextButton from '@components/buttons/text_button';
import Input, { Inputix } from '@components/inputs/input/Input';
import ModalContainer from '@components/modal_container';
import { zodResolver } from '@hookform/resolvers/zod';
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

  const onSubmit: SubmitHandler<Inputs> = (formData) => {
    console.log(
      '🚀 ~ file: ChangeSecretModal.tsx:77 ~ ChangeSecretModal ~ formData',
      formData,
    );
    //TODO handle submit
  };
  return (
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
          />
          <Input
            type="text"
            label="Repeat secret key"
            name="repeatSecretKey"
            fillContainer
          />
        </Inputix>
      </div>
    </ModalContainer>
  );
}
