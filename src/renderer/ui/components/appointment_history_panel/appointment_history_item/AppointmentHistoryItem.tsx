import SquareIconButton from '@components/buttons/square_icon_button/SquareIconButton';
import PreviewWithControls from '@components/preview_with_controls';
import SessionPreviewModal from '@containers/modals/session_preview_modal';
import { useOverlay } from '@libs/overlay/useOverlay';
import AppointmentHistoryIcon from 'toSvg/appointment_history.svg?icon';
interface AppointmentHistoryItemProps {
  appointmentDate: string;
  appointmentDescription: string;
}
export default function AppointmentHistoryItem({
  appointmentDate,
  appointmentDescription,
}: AppointmentHistoryItemProps) {
  const { open } = useOverlay();
  return (
    <PreviewWithControls
      primaryText={appointmentDate}
      secondaryText={appointmentDescription}
    >
      <SquareIconButton
        svg={AppointmentHistoryIcon}
        onPress={() => {
          open(<SessionPreviewModal />, {
            closeOnClickOutside: true,
            isDimmed: true,
            clickThrough: false,
            closeBtn: 'inner',
            width: '30%',
          });
        }}
      />
    </PreviewWithControls>
  );
}
