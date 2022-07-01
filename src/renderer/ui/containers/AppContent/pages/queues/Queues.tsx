import AppointmentsQueue from '@components/appointments_queue';
import BookedAppointmentPanel from '@components/booked_appointment_panel';
import PaymentQueue from '@components/payment_queue';
import SmallClinicStatus from '@components/small_clinic_status';
import './style/index.scss';

interface QueuesProps {}
export default function Queues({}: QueuesProps) {
  return (
    <div className="queues">
      <span>Appointment Queue</span>
      <AppointmentsQueue />
      <PaymentQueue />
      <div className="queues-footer">
        <BookedAppointmentPanel />
        <SmallClinicStatus />
      </div>
    </div>
  );
}
