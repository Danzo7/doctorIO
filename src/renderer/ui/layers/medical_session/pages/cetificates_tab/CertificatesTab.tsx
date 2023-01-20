import { useDiagnosis } from '@stores/medicalSessionStore';
import './style/index.scss';
import { MedicalCertificate } from '@models/instance.model';

type Data = {
  diagnosis: MedicalCertificate[];
};
interface CertificatesTabProps {
  mentions?: string[];
}
export default function CertificatesTab({ mentions }: CertificatesTabProps) {
  const diagnosis = useDiagnosis();

  return (
    <div className="certificates-tab">
      {/* <CertificateEditor
        mentions={mentions}
        defaultValue={diagnosis}
        onChange={(v) => {
          useMedicalSessionStore.getState().setDiagnosis(v);
        }}
      /> */}
    </div>
  );
}
export function TimeLineDiagnosis({ diagnosis }: Data) {
  return (
    <div className="certificates-tab">
      <div className="span-wrapper">{/* <span>{diagnosis}</span> */}</div>
    </div>
  );
}
