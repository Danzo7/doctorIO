import { color } from '@assets/styles/color';
import AppointmentsCurrentPatient from '@components/appointments_current_patient';
import { QueueState } from '@models/instance.model';
import { parseISO } from 'date-fns';
import './style/index.scss';

export default function CabinState({ state, selected }: QueueState) {
  console.log('selected : ', selected);
  return (
    <div className="cabin-state">
      <span>Status</span>

      {selected && (state == 'IN_PROGRESS' || state == 'WAITING') && (
        <>
          <div className="In-progress-div">
            {state == 'IN_PROGRESS' && (
              <span css={{ color: color.cold_blue }}>In Progress</span>
            )}
            {state == 'WAITING' && (
              <span css={{ color: color.warm_orange }}>Waiting</span>
            )}
          </div>
          <AppointmentsCurrentPatient
            patientName={selected.patientName}
            position={selected.position}
            arrivalTime={selected.date}
          />
        </>
      )}

      {state == 'PAUSED' && (
        <div className="paused-div">
          <span>Paused</span>
        </div>
      )}
      {state == 'IDLE' && (
        <div className="idle-div">
          <span>IDLE</span>
        </div>
      )}
    </div>
  );
}
