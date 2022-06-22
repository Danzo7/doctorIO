import { formatDistance, subDays } from 'date-fns';
import './style/index.scss';
interface AppointmentsCurrentPatientProps {
  patientName: string;
  arrivalTime?: Date;
  position: number;
}
export default function AppointmentsCurrentPatient({
  patientName,
  arrivalTime = subDays(new Date(), 3),
  position,
}: AppointmentsCurrentPatientProps) {
  return (
    <div className="appointments-current-patient">
      <div className="patient-info">
        <span>{patientName}</span>
        <span>{formatDistance(arrivalTime, new Date())} ago</span>
      </div>
      <div className="number-container">
        <span>Number</span>
        <span>{position}</span>
      </div>
    </div>
  );
}
