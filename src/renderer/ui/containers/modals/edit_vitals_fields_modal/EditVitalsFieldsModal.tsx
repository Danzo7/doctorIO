import ModalContainer from '@components/modal_container';
import './style/index.scss';
import TextButton from '@components/buttons/text_button';
import { color } from '@assets/styles/color';
interface EditVitalsFieldsModalProps {}
export default function EditVitalsFieldsModal({}: EditVitalsFieldsModalProps) {
  return (
    <div className="edit-vitals-fields-modal">
      <ModalContainer
        title="Edit Vitals fields"
        controls={
          <TextButton
            text={'Save'}
            backgroundColor={color.good_green}
            radius={7}
            fontSize={14}
            width={'60%'}
            blank
            type="submit"
          />
        }
      ></ModalContainer>
    </div>
  );
}
