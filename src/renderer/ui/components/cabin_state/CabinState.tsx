import color from '@assets/styles/color';
import AppointmentsCurrentPatient from '@components/appointments_current_patient';
import './style/index.scss';

interface CabinStateProps {
  state: 'inProgress' | 'paused' | 'waiting';
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
      {(state == 'inProgress' || state == 'waiting') &&
        patientName &&
        patientNumber &&
        duration && (
          <>
            <div className="In-progress-div">
              {state == 'inProgress' && (
                <span css={{ color: color.cold_blue }}>In Progress</span>
              )}
              {state == 'waiting' && (
                <span css={{ color: color.warm_orange }}>Waiting</span>
              )}
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
