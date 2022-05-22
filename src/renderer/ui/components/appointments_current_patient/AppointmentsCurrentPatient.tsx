import './style/index.scss';
interface AppointmentsCurrentPatientProps {
  patientName: string;
  duration: string;
  patientNumber: number;
}
export default function AppointmentsCurrentPatient({
  patientName,
  duration,
  patientNumber,
}: AppointmentsCurrentPatientProps) {
  return (
    <div className="appointments-current-patient">
      <div className="patient-info">
        <span>{patientName}</span>
        <span>{duration}</span>
      </div>
      <div className="line" />
      <div className="number-container">
        <span>Number</span>
        <span>{patientNumber}</span>
      </div>
    </div>
  );
}