import Input from '@components/inputs/input';
import Key from 'toSvg/key.svg?icon';
import TextButton from '@components/buttons/text_button';
import { color } from '@assets/styles/color';
import ModalContainer from '@components/modal_container';

interface JoinNewClinicModalProps {}
export default function JoinNewClinicModal({}: JoinNewClinicModalProps) {
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
        leading={<Key />}
        type="text"
        hint="The invite key should be provided by a clinic member"
      />
    </ModalContainer>
  );
}
