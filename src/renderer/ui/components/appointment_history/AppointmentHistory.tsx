import IconicButton from '@components/buttons/iconic_button';
import './style/index.scss';
import AppointmentHistoryIcon from 'toSvg/appointment_history.svg?icon';
import color from '@assets/styles/color';
interface AppointmentHistoryProps {
  appointmentDate: string;
  appointmentDescription: string;
  onPress: () => void;
}
export default function AppointmentHistory({
  appointmentDate,
  appointmentDescription,
  onPress,
}: AppointmentHistoryProps) {
  return (
    <div className="appointment-history">
      <div className="appointment-history-info">
        <span>{appointmentDate}</span>
        <span>{appointmentDescription}</span>
      </div>
      <div className="appointment-history-button">
        <IconicButton
          Icon={AppointmentHistoryIcon}
          backgroundColor={color.light}
          iconSize={18}
          width={50}
          onPress={onPress}
        />
      </div>
    </div>
  );
}
