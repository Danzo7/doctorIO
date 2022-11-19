import AppointmentHistoryPanel from '@components/appointment_history_panel';
import MedicalHistory from '@components/medical_history';
import PreviewInfo from '@components/preview_info';
import { BiometricScreening } from '@models/instance.model';
import './style/index.scss';

interface MedicalSessionSideBarProps {
  patientId: number;
  biometricScreening?: BiometricScreening;
}
export default function MedicalSessionSideBar({
  patientId,
  biometricScreening,
}: MedicalSessionSideBarProps) {
  return (
    <div className="medical-session-side-bar">
      <div className="medical-session-side-bar-content">
        {biometricScreening && (
          <PreviewInfo title="Diagnosis" data={biometricScreening} />
        )}

        <MedicalHistory patientId={patientId} />
        <AppointmentHistoryPanel patientId={patientId} />
      </div>
    </div>
  );
}
