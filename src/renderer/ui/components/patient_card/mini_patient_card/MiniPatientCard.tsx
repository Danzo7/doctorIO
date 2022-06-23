import { DATE_ONLY } from '@constants/data_format';
import { format } from 'date-fns';
import './style/index.scss';
interface MiniPatientCardProps {
  patientFullName: string;
  patientId: string;
  numPostAppointment: number;
  nextAppointmentDate?: Date;
}
export default function MiniPatientCard({
  patientFullName,
  patientId,
  numPostAppointment,
  nextAppointmentDate,
}: MiniPatientCardProps) {
  return (
    <div className="mini-patient-card">
      <span>{patientFullName}</span>
      <span>{patientId} </span>
      <div className="mini-patient-bottom-container">
        <div className="bottom-info">
          <span>{numPostAppointment}</span>
          <span>Post Appointment</span>
        </div>
        <div className="bottom-info-sep" />
        <div className="bottom-info">
          <span>
            {nextAppointmentDate
              ? format(nextAppointmentDate, DATE_ONLY)
              : 'No'}
          </span>
          <span>Upcoming</span>
        </div>
      </div>
    </div>
  );
}
