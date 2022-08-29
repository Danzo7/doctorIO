import AppointmentHistoryPanel from '@components/appointment_history_panel';
import DarkLightCornerButton from '@components/buttons/dark_light_corner_button';
import LoadingSpinner from '@components/loading_spinner';
import MedicalHistory from '@components/medical_history';
import PreviewInfo from '@components/preview_info';
import DiagnosisPreview from '@containers/modals/diagnosis_preview';
import { DEFAULT_MODAL } from '@libs/overlay';
import { useOverlay } from '@libs/overlay/useOverlay';
import { useGetPatientDetailQuery } from '@redux/instance/record/patient_api';
import './style/index.scss';

interface MedicalSessionSideBarProps {
  patientId: number;
}
export default function MedicalSessionSideBar({
  patientId,
}: MedicalSessionSideBarProps) {
  const { open } = useOverlay();
  const { isSuccess, data, isFetching, isLoading, error } =
    useGetPatientDetailQuery(patientId);

  return (
    <div className="medical-session-side-bar">
      <div className="medical-session-side-bar-content">
        {isLoading || isFetching ? (
          <LoadingSpinner />
        ) : (
          isSuccess &&
          data.test && (
            <PreviewInfo
              title="Diagnosis"
              data={data.test}
              buttonNode={
                <DarkLightCornerButton
                  text="preview"
                  blend
                  onPress={() => {
                    if (data.test)
                      open(
                        <DiagnosisPreview data={data.test} />,
                        DEFAULT_MODAL,
                      );
                  }}
                />
              }
            />
          )
        )}
        <MedicalHistory patientId={patientId} />
        <AppointmentHistoryPanel patientId={patientId} />
      </div>
    </div>
  );
}
