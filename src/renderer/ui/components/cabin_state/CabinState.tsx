import { color } from '@assets/styles/color';
import AppointmentsCurrentPatient from '@components/appointments_current_patient';
import { AppointmentQueueItem } from '@models/instance.model';
import './style/index.scss';

interface CabinStateProps {
  state:
    | 'paused'
    | ({ state: 'inProgress' | 'waiting' } & AppointmentQueueItem);
}
export default function CabinState({ state }: CabinStateProps) {
  return (
    <div className="cabin-state">
      <span>Status</span>
      {typeof state != 'string' && (
        <>
          <div className="In-progress-div">
            {state.state == 'inProgress' && (
              <span css={{ color: color.cold_blue }}>In Progress</span>
            )}
            {state.state == 'waiting' && (
              <span css={{ color: color.warm_orange }}>Waiting</span>
            )}
          </div>
          <AppointmentsCurrentPatient
            patientName={state.patientName}
            position={state.position}
            arrivalTime={state.date}
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
