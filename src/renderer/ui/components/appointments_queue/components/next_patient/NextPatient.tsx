import colors from '@colors';
import SquareIconButton from '@components/buttons/square_icon_button/SquareIconButton';
import TextButton from '@components/buttons/text_button';
import AppointmentsCurrentPatient from '@components/appointments_current_patient';
import './style/index.scss';
import Header from '@components/header';
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
      <Header
        title="Next patient"
        buttonNode={<SquareIconButton />}
        titleFontSize={21}
      />
      <AppointmentsCurrentPatient
        patientName={patientName}
        duration={appointmentDuration}
        patientNumber={patientNumber}
      />
      <TextButton
        text="Start session"
        backgroundColor={colors.good_green}
        width="100%"
        fontColor={colors.white}
        fontSize={13}
        fontWeight={700}
      />
    </div>
  );
}
