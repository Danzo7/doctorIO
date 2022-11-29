import AppointmentsQueue from '@components/appointments_queue';
import BookedAppointmentPanel from '@components/booked_appointment_panel';
import ErrorPanel from '@components/error_panel';
import PaymentQueue from '@components/payment_queue';
import SmallClinicStatus from '@components/small_clinic_status';
import { useAbility } from '@stores/abilityStore';
import './style/index.scss';

interface QueuesProps {}
export default function Queues({}: QueuesProps) {
  const ability = useAbility();
  return ability.can('have', 'queue') || ability.can('manage', 'queue') ? (
    <div className="queues">
      <span>Appointment Queue</span>
      <div className="queues-header">
        <AppointmentsQueue />
        <PaymentQueue />
      </div>
      <div className="queues-footer">
        <BookedAppointmentPanel />
        <SmallClinicStatus />
      </div>
    </div>
  ) : (
    <ErrorPanel />
  );
}
