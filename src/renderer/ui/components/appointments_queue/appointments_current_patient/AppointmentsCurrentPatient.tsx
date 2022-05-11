import './style/index.scss';
interface AppointmentsCurrentPatientProps {
  patientName: string;
  appointmentDuration: string;
  patientNumber: number;
}
export default function AppointmentsCurrentPatient({
  patientName,
  appointmentDuration,
  patientNumber,
}: AppointmentsCurrentPatientProps) {
  return (
    <div className="appointments-current-patient">
      <div className="patient-info">
        <span>{patientName}</span>
        <span>{appointmentDuration}</span>
      </div>
      <div className="line" />
      <div className="number-container">
        <span>Number</span>
        <span>{patientNumber}</span>
      </div>
    </div>
  );
}
