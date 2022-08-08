import AppointmentHistoryPanel from '@components/appointment_history_panel';
import DarkLightCornerButton from '@components/buttons/dark_light_corner_button';
import MedicalHistory from '@components/medical_history';
import PreviewInfo from '@components/preview_info';
import DiagnosisPreview from '@containers/modals/diagnosis_preview';
import { DEFAULT_MODAL } from '@libs/overlay';
import { useOverlay } from '@libs/overlay/useOverlay';
import { Patient } from '@models/instance.model';
import './style/index.scss';

interface MedicalSessionSideBarProps {
  patient: Patient;
}
export default function MedicalSessionSideBar({
  patient,
}: MedicalSessionSideBarProps) {
  const { open } = useOverlay();

  return (
    <div className="medical-session-side-bar">
      <div className="medical-session-side-bar-content">
        <PreviewInfo
          title="Diagnosis"
          data={patient.test}
          buttonNode={
            <DarkLightCornerButton
              text="preview"
              blend
              onPress={() => {
                open(<DiagnosisPreview data={patient.test} />, DEFAULT_MODAL);
              }}
            />
          }
        />
        <MedicalHistory list={patient.medicalHistory} />
        <AppointmentHistoryPanel
          list={
            patient.appointments
              .filter(
                (appointment) =>
                  appointment.state == 'done' ||
                  appointment.state == 'done-booked',
              )
              .slice(-3) as any
          }
        />
      </div>
    </div>
  );
}
