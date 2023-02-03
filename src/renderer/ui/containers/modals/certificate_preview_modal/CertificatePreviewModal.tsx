import ModalContainer from '@components/modal_container';
import './style/index.scss';
import TextButton from '@components/buttons/text_button';
import { color } from '@assets/styles/color';
import CertificateEditor from '@components/certificates_editor';
import {
  Appointment,
  MedicalCertificate,
  Patient,
} from '@models/instance.model';
import { modal } from '@stores/overlayStore';
import PrintPaper from '@components/print_paper';
import { DEFAULT_MODAL } from '@libs/overlay';
import { Member } from '@models/server.models';

interface CertificatePreviewModalProps {
  defaultValue: MedicalCertificate;
  patient: Patient;
  member: Pick<Member, 'id' | 'name'>;
  appointment: Pick<Appointment, 'date' | 'id'>;
}

export default function CertificatePreviewModal({
  patient,
  defaultValue,
  member,
  appointment,
}: CertificatePreviewModalProps) {
  return (
    <div className="certificate-preview-modal">
      <ModalContainer
        title="Medical certificate"
        {...{
          controls: (
            <div className="certificate-preview-controls">
              <TextButton
                text="Print"
                backgroundColor={color.good_green}
                fontSize={14}
                blank
                onPress={() =>
                  modal(
                    <PrintPaper
                      appointment={appointment}
                      content={defaultValue}
                      patient={patient}
                      member={member}
                    />,
                    DEFAULT_MODAL,
                  ).open()
                }
              />
            </div>
          ),
        }}
      >
        <div className="certificate-preview-inputs">
          <div>{defaultValue.title}</div>
          <div className="certificate-editor-wrapper">
            <span>Content</span>
            <CertificateEditor
              defaultValue={defaultValue.description}
              readonly={true}
            />
          </div>
        </div>
      </ModalContainer>
    </div>
  );
}
