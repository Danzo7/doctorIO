import { color } from '@assets/styles/color';
import AppointmentsCurrentPatient from '@components/appointments_current_patient';
import NotAButton from '@components/not_a_button';
import { QueueState } from '@models/instance.model';
import './style/index.scss';

export default function CabinState({ state, selected }: QueueState) {
  return (
    <div className="cabin-state">
      <span>Status</span>

      {selected && (state == 'IN_PROGRESS' || state == 'WAITING') && (
        <>
          {state == 'IN_PROGRESS' && (
            <NotAButton
              text={'In Progress'}
              color={color.cold_blue}
              padding={'10px 30px'}
              fontSize={16}
              width={'100%'}
            />
          )}
          {state == 'WAITING' && (
            <NotAButton
              text={'Waiting'}
              color={color.warm_orange}
              padding={'10px 30px'}
              fontSize={16}
              width={'100%'}
            />
          )}

          <AppointmentsCurrentPatient
            patientName={selected.patientName}
            position={selected.position}
            arrivalTime={selected.date}
          />
        </>
      )}

      {state == 'PAUSED' && (
        <NotAButton
          text={'Paused'}
          color={color.hot_red}
          padding={'10px 30px'}
          fontSize={16}
        />
      )}
      {state == 'IDLE' && (
        <NotAButton
          text={'IDLE'}
          color={color.warm_orange}
          padding={'10px 30px'}
          fontSize={16}
        />
      )}
    </div>
  );
}
