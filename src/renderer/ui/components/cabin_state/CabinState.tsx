import AppointmentsCurrentPatient from '@components/appointments_current_patient';
import './style/index.scss';

interface CabinStateProps {
  state: 'inProgress' | 'paused';
  patientName?: string;
  patientNumber?: number;
  duration?: string;
}
export default function CabinState({
  state,
  patientName,
  patientNumber,
  duration,
}: CabinStateProps) {
  return (
    <div className="cabin-state">
      <span>Status</span>
      {state == 'inProgress' && patientName && patientNumber && duration && (
        <>
          <div className="In-progress-div">
            <span>In progress</span>
          </div>
          <AppointmentsCurrentPatient
            patientName={patientName}
            patientNumber={patientNumber}
            duration={duration}
          />
        </>
      )}
      {state == 'paused' && (
        <div className="paused-div">
          <span>Paused</span>
        </div>
      )}
    </div>
  );
}
