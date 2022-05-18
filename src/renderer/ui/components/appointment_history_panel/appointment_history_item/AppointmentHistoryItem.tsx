import SquareIconButton from '@components/buttons/square_icon_button/SquareIconButton';
import PreviewWithControls from '@components/preview_with_controls';
import AppointmentHistoryIcon from 'toSvg/appointment_history.svg?icon';
interface AppointmentHistoryItemProps {
  appointmentDate: string;
  appointmentDescription: string;
  onPressHistory: () => void;
}
export default function AppointmentHistoryItem({
  appointmentDate,
  appointmentDescription,
  onPressHistory,
}: AppointmentHistoryItemProps) {
  return (
    <PreviewWithControls
      primaryText={appointmentDate}
      secondaryText={appointmentDescription}
    >
      <SquareIconButton svg={AppointmentHistoryIcon} onPress={onPressHistory} />
    </PreviewWithControls>
  );
}
