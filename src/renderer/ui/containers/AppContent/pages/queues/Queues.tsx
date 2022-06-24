import AppointmentsQueue from '@components/appointments_queue';
import BookedAppointmentPanel from '@components/booked_appointment_panel';
import PaymentQueue from '@components/payment_queue';
import SmallClinicStatus from '@components/small_clinic_status';
import './style/index.scss';

const bookedAppointmentData = [
  {
    bookTime: new Date('2022-05-01'),
    id: '1',
    memberId: '1',
    memberName: 'John Doe',
    patientId: '1',
    patientName: 'John cruze',
  },
  {
    bookTime: new Date('2022-05-01'),
    id: '2',
    memberId: '1',
    memberName: 'John Doe',
    patientId: '1',
    patientName: 'John cruze',
  },
  {
    bookTime: new Date('2022-05-01'),
    id: '3',
    memberId: '1',
    memberName: 'John Doe',
    patientId: '1',
    patientName: 'John cruze',
  },
  {
    bookTime: new Date('2022-05-01'),
    id: '4',
    memberId: '1',
    memberName: 'John Doe',
    patientId: '1',
    patientName: 'John cruze',
  },
  {
    bookTime: new Date('2022-05-01'),
    id: '5',
    memberId: '1',
    memberName: 'John Doe',
    patientId: '1',
    patientName: 'John cruze',
  },
  {
    bookTime: new Date('2022-05-01'),
    id: '6',
    memberId: '1',
    memberName: 'John Doe',
    patientId: '1',
    patientName: 'John cruze',
  },
  {
    bookTime: new Date('2022-05-01'),
    id: '7',
    memberId: '1',
    memberName: 'John Doe',
    patientId: '1',
    patientName: 'John cruze',
  },
  {
    bookTime: new Date('2022-05-01'),
    id: '8',
    memberId: '1',
    memberName: 'John Doe',
    patientId: '1',
    patientName: 'John cruze',
  },
];

interface QueuesProps {}
export default function Queues({}: QueuesProps) {
  return (
    <div className="queues">
      <span>Appointment Queue</span>
      <AppointmentsQueue cabinState="inProgress" />
      <PaymentQueue />
      <div className="queues-footer">
        <BookedAppointmentPanel list={bookedAppointmentData} />
        <SmallClinicStatus />
      </div>
    </div>
  );
}
