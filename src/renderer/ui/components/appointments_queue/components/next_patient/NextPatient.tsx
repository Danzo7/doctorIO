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
  onNotify?: () => void;
  onStartSession?: () => void;
}
export default function NextPatient({
  patientName,
  appointmentDuration,
  patientNumber,
  onNotify,
  onStartSession,
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
      <div className="next-patient-controls">
        <TextButton
          text="Notify"
          backgroundColor={colors.cold_blue}
          fontColor={colors.white}
          fontSize={13}
          fontWeight={700}
          onPress={onNotify}
        />
        <TextButton
          text="Start session"
          backgroundColor={colors.good_green}
          width="100%"
          fontColor={colors.white}
          fontSize={13}
          fontWeight={700}
          onPress={onStartSession}
        />
      </div>
    </div>
  );
}
