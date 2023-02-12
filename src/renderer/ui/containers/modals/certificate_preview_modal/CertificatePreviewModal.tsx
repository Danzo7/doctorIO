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
import { FIT_MODAL } from '@libs/overlay';
import { Member } from '@models/server.models';
import TextPair from '@components/text_pair/TextPair';

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
        controlsPosition="end"
        controls={
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
                FIT_MODAL,
              ).open()
            }
          />
        }
      >
        <div className="certificate-editor-inputs ">
          <TextPair
            first={{
              text: 'Title',
              fontSize: 16,
              fontWeight: 500,
              fontColor: color.text_gray,
            }}
            second={
              <div className="title-div">
                <span>{defaultValue.title}</span>
              </div>
            }
          />

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
