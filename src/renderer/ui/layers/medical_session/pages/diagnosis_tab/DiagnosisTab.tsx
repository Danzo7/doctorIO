import {
  useDiagnosis,
  useMedicalSessionStore,
} from '@stores/medicalSessionStore';
import './style/index.scss';
import NoticeEditor from '@components/notice_editor';

type Data = {
  diagnosis: string;
};
export default function DiagnosisTab() {
  const diagnosis = useDiagnosis();

  return (
    <div className="notice-tab">
      <NoticeEditor
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
