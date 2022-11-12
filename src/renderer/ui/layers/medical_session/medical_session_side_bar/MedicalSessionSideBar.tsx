import AppointmentHistoryPanel from '@components/appointment_history_panel';
import MedicalHistory from '@components/medical_history';
import PreviewInfo from '@components/preview_info';
import { Test } from '@models/instance.model';
import './style/index.scss';

interface MedicalSessionSideBarProps {
  patientId: number;
  test?: Test;
}
export default function MedicalSessionSideBar({
  patientId,
  test,
}: MedicalSessionSideBarProps) {
  return (
    <div className="medical-session-side-bar">
      <div className="medical-session-side-bar-content">
        {test && <PreviewInfo title="Diagnosis" data={test} />}

        <MedicalHistory patientId={patientId} />
        <AppointmentHistoryPanel patientId={patientId} />
      </div>
    </div>
  );
}
