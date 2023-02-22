import './style/index.scss';

import KeywordFieldItem from '@components/keyword_field_item';
import { modal } from '@stores/overlayStore';
import { DEFAULT_MODAL } from '@libs/overlay';
import {
  Appointment,
  MedicalCertificate,
  Patient,
} from '@models/instance.model';
import { Member } from '@models/server.models';
import CertificatePreviewModal from '@containers/modals/certificate_preview_modal';

export default function CertificatesView({
  certificates,
  patient,
  member,
  appointment,
}: {
  certificates: MedicalCertificate[];
  patient: Patient;
  member: Pick<Member, 'id' | 'name'>;
  appointment: Appointment;
}) {
  return (
    <div className="certificates-view-tab">
      {certificates.map((certificate, index) => (
        <KeywordFieldItem
          gap={10}
          key={index}
          name={certificate.title}
          onView={() =>
            modal(
              () => (
                <CertificatePreviewModal
                  appointment={appointment}
                  defaultValue={certificate}
                  patient={patient}
                  member={member}
                />
              ),
              { ...DEFAULT_MODAL, width: '90%', height: '90%' },
              'certificateModal',
            ).open()
          }
        />
      ))}
    </div>
  );
}
