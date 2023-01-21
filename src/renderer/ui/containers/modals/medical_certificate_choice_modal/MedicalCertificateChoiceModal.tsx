import ModalContainer from '@components/modal_container';
import './style/index.scss';
import TextButton from '@components/buttons/text_button';
import { Overlay_u, modal } from '@stores/overlayStore';
import { color } from '@assets/styles/color';
import CertificateEditorModal from '../certificate_editor_modal';
import { DEFAULT_MODAL } from '@libs/overlay';
interface MedicalCertificateChoiceModalProps {}
export default function MedicalCertificateChoiceModal({}: MedicalCertificateChoiceModalProps) {
  return (
    <div className="medical-certificate-choice-modal">
      <ModalContainer
        title="Choose medical certificate type"
        controlsPosition="end"
        controls={
          <TextButton
            text="Cancel"
            backgroundColor={color.silver_gray}
            fontSize={14}
            fontWeight={700}
            padding=" 5px 15px"
            onPress={() => {
              Overlay_u.close();
            }}
          />
        }
      >
        <div className="medical-certificate-choice-options">
          <TextButton
            text="Create certificate from template"
            backgroundColor={color.cold_blue}
            fontSize={14}
            fontWeight={700}
            onPress={() => {
              //TODO open certificates dropdown
            }}
          />
          <TextButton
            text="Create new one"
            backgroundColor={color.cold_blue}
            fontSize={14}
            fontWeight={700}
            onPress={() => {
              modal(<CertificateEditorModal />, DEFAULT_MODAL).open();
            }}
          />
        </div>
      </ModalContainer>
    </div>
  );
}
