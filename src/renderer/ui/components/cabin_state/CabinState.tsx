import { color } from '@assets/styles/color';
import AppointmentsCurrentPatient from '@components/appointments_current_patient';
import { ComponentProps } from 'react';
import './style/index.scss';

interface CabinStateProps {
  state: 'inProgress' | 'paused' | 'waiting';
}
export default function CabinState({
  state,
  patientName,
  position,
  arrivalTime,
}: CabinStateProps & ComponentProps<typeof AppointmentsCurrentPatient>) {
  return (
    <div className="cabin-state">
      <span>Status</span>
      {(state == 'inProgress' || state == 'waiting') &&
        patientName &&
        position &&
        arrivalTime && (
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
              position={position}
              arrivalTime={arrivalTime}
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
