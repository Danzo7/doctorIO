import SquareIconButton from '@components/buttons/square_icon_button/SquareIconButton';
import PreviewWithControls from '@components/preview_with_controls';
import { DATE_ONLY } from '@constants/data_format';
import SessionPreviewModal from '@containers/modals/session_preview_modal';
import { useOverlay } from '@libs/overlay/useOverlay';
import { Appointment, Test } from '@models/instance.model';
import { format } from 'date-fns';
import AppointmentHistoryIcon from 'toSvg/appointment_history.svg?icon';

export default function AppointmentHistoryItem({
  date,
  subject,
  session,
}: Pick<Appointment, 'date' | 'subject' | 'session'>) {
  const { open } = useOverlay();

  return (
    <PreviewWithControls
      primaryText={date ? format(date, DATE_ONLY) : ''}
      secondaryText={subject ? subject : 'Untitled'}
    >
      {session && (
        <SquareIconButton
          Icon={AppointmentHistoryIcon}
          onPress={() => {
            open(<SessionPreviewModal session={session} />, {
              closeOnClickOutside: true,
              isDimmed: true,
              clickThrough: false,
              closeBtn: 'inner',
              width: '30%',
            });
          }}
        />
      )}
    </PreviewWithControls>
  );
}
