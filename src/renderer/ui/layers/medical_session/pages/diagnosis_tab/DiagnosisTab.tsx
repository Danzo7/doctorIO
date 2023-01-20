import {
  useDiagnosis,
  useMedicalSessionStore,
} from '@stores/medicalSessionStore';
import './style/index.scss';
import CertificateEditor from '@components/certificates_editor';

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
export function TimeLineDiagnosis({ diagnosis }: Data) {
  return (
    <div className="notice-tab">
      <div className="span-wrapper">
        <span>{diagnosis}</span>
      </div>
    </div>
  );
}
