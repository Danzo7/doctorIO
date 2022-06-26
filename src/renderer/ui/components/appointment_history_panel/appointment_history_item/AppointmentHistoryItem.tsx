import SquareIconButton from '@components/buttons/square_icon_button/SquareIconButton';
import PreviewWithControls from '@components/preview_with_controls';
import { DATE_ONLY } from '@constants/data_format';
import SessionPreviewModal from '@containers/modals/session_preview_modal';
import { useOverlay } from '@libs/overlay/useOverlay';
import { format } from 'date-fns';
import AppointmentHistoryIcon from 'toSvg/appointment_history.svg?icon';
interface AppointmentHistoryItemProps {
  date: Date;
  subject: string;
  id: number;
}
export default function AppointmentHistoryItem({
  date,
  subject,
}: AppointmentHistoryItemProps) {
  const { open } = useOverlay();
  return (
    <PreviewWithControls
      primaryText={format(date, DATE_ONLY)}
      secondaryText={subject}
    >
      <SquareIconButton
        Icon={AppointmentHistoryIcon}
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
