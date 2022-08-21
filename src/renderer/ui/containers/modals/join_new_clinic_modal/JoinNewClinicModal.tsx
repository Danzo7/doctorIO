import Input from '@components/inputs/input';
import Key from 'toSvg/key.svg?icon';
import TextButton from '@components/buttons/text_button';
import { color } from '@assets/styles/color';
import ModalContainer from '@components/modal_container';
import { useForm } from 'react-hook-form';

interface JoinNewClinicModalProps {}
export default function JoinNewClinicModal({}: JoinNewClinicModalProps) {
  const { control, handleSubmit } = useForm<{ clinicId: string }>({
    mode: 'onSubmit',
  });
  return (
    <ModalContainer
      title="Join a new clinic"
      controls={
        <TextButton
          text="Validate"
          backgroundColor={color.cold_blue}
          fontSize={13}
          fontWeight={700}
          alignSelf="center"
          padding={5}
        />
      }
    >
      <Input
        name="clinicId"
        control={control}
        leading={<Key />}
        type="text"
        hint="The invite key should be provided by a clinic member"
      />
    </ModalContainer>
  );
}
