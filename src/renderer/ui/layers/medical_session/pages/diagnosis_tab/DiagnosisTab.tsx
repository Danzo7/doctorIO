import {
  useDiagnosis,
  useMedicalSessionStore,
} from '@stores/medicalSessionStore';
import './style/index.scss';
import CertificateEditor from '@components/certificates_editor';
import { MedicalCertificate } from '@models/instance.model';
import KeywordFieldItem from '@components/keyword_field_item';
import VerticalPanel from '@components/vertical_panel';

type Data = {
  diagnosis: string;
};
interface DiagnosisTabProps {
  mentions?: string[];
}
export default function DiagnosisTab({ mentions }: DiagnosisTabProps) {
  const diagnosis = useDiagnosis();

  return (
    <div className="notice-tab">
      <CertificateEditor
        mentions={mentions}
        defaultValue={diagnosis}
        onChange={(v) => {
          useMedicalSessionStore.getState().setDiagnosis(v);
        }}
      />
    </div>
  );
}
export function CertificatesView({
  certificates,
}: {
  certificates?: MedicalCertificate[];
}) {
  return (
    <div className="certificates-view-tab">
      {certificates && certificates.length > 0 ? (
        certificates.map((certificate, index) => (
          <KeywordFieldItem
            id={Number(certificate.id)}
            key={index}
            name={certificate.title}
            mode="view"
          />
        ))
      ) : (
        <VerticalPanel
          title="No certifications given"
          description="this patient does not have any certificate. "
        />
      )}
    </div>
  );
}
