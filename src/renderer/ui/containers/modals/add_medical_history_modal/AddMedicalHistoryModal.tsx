import { color } from '@assets/styles/color';
import TextButton from '@components/buttons/text_button';
import TextArea from '@components/inputs/text_area';
import ModalContainer from '@components/modal_container';
import { Overlay } from '@libs/overlay';

interface AddMedicalHistoryModalProps {}
export default function AddMedicalHistoryModal({}: AddMedicalHistoryModalProps) {
  return (
    <ModalContainer
      title="Medical history"
      controls={
        <TextButton
          text="Add"
          backgroundColor={color.good_green}
          width="fit-content"
          alignSelf="center"
          padding={'5px 15px'}
          fontSize={12}
          onPress={() => {
            Overlay.close();
          }}
        />
      }
    >
      <TextArea fillContainer />
    </ModalContainer>
  );
}
