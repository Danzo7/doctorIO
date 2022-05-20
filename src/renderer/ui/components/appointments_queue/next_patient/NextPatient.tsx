import color from '@assets/styles/color';
import SquareIconButton from '@components/buttons/square_icon_button/SquareIconButton';
import TextButton from '@components/buttons/text_button';
import AppointmentsCurrentPatient from '../appointments_current_patient';
import './style/index.scss';
interface NextPatientProps {
  patientName: string;
  appointmentDuration: string;
  patientNumber: number;
}
export default function NextPatient({
  patientName,
  appointmentDuration,
  patientNumber,
}: NextPatientProps) {
  return (
    <div className="next-patient">
      <div className="next-patient-header">
        <span>Next patient</span>
        <SquareIconButton />
      </div>
      <AppointmentsCurrentPatient
        patientName={patientName}
        duration={appointmentDuration}
        patientNumber={patientNumber}
      />
      <TextButton
        text="Start session"
        backgroundColor={color.good_green}
        width="100%"
        fontColor={color.white}
        fontSize={13}
        fontWeight={700}
      />
    </div>
  );
}
