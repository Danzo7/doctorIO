import AppointmentsQueue from '@components/appointments_queue';
import BookedAppointmentPanel from '@components/booked_appointment_panel';
import PaymentQueue from '@components/payment_queue';
import SmallClinicStatus from '@components/small_clinic_status';
import { NavTabMenu } from '@components/tab_menu';
import './style/index.scss';

const bookedAppointmentData = [
  {
    patientFullName: 'John Doe',
    BookedInDate: '28 Feb 2021',
    BookedByFullName: 'brahim aymen',
  },
  {
    patientFullName: 'John Doe',
    BookedInDate: '29 Feb 2021',
    BookedByFullName: 'brahim aymen',
  },
  {
    patientFullName: 'John Doe',
    BookedInDate: '02 Feb 2021',
    BookedByFullName: 'brahim aymen',
  },
  {
    patientFullName: 'John Doe',
    BookedInDate: '02 Feb 2021',
    BookedByFullName: 'brahim aymen',
  },
  {
    patientFullName: 'John Doe',
    BookedInDate: '02 Feb 2021',
    BookedByFullName: 'brahim aymen',
  },
  {
    patientFullName: 'John Doe',
    BookedInDate: '02 Feb 2021',
    BookedByFullName: 'brahim aymen',
  },
  {
    patientFullName: 'John Doe',
    BookedInDate: '02 Feb 2021',
    BookedByFullName: 'brahim aymen',
  },
  {
    patientFullName: 'John Doe',
    BookedInDate: '02 Feb 2021',
    BookedByFullName: 'brahim aymen',
  },
];

interface QueuesProps {}
export default function Queues({}: QueuesProps) {
  return (
    <div className="queues">
      <span>Appointment Queue</span>
      <NavTabMenu items={['Doctor', 'test']} />
      <AppointmentsQueue cabinState="inProgress" />
      <PaymentQueue />
      <div className="queues-footer">
        <BookedAppointmentPanel bookedAppointmentData={bookedAppointmentData} />
        <SmallClinicStatus />
      </div>
    </div>
  );
}
