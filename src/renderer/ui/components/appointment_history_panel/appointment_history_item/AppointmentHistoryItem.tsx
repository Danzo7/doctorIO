import color from '@assets/styles/color';
import SquareIconButton from '@components/buttons/square_icon_button/SquareIconButton';
import TextButton from '@components/buttons/text_button';
import PreviewWithControls from '@components/preview_with_controls';
import { DATE_ONLY } from '@constants/data_format';
import AlertModal from '@containers/modals/dialog_modal';
import SessionPreviewModal from '@containers/modals/session_preview_modal';
import { DEFAULT_MODAL } from '@libs/overlay';
import { useOverlay } from '@libs/overlay/useOverlay';
import { Appointment } from '@models/instance.model';
import { format } from 'date-fns';
import AppointmentHistoryIcon from 'toSvg/appointment_history.svg?icon';

export default function AppointmentHistoryItem({
  date,
  subject,
  session,
}: Pick<Appointment, 'date' | 'subject' | 'session'>) {
  const { open, close } = useOverlay();

  return (
    <PreviewWithControls
      primaryText={date ? format(date, DATE_ONLY) : ''}
      secondaryText={subject ? subject : 'Untitled'}
    >
      {session && (
        <SquareIconButton
          Icon={AppointmentHistoryIcon}
          onPress={() => {
            if (
              session.prescription.length > 0 &&
              session.diagnosis != undefined
            )
              open(<SessionPreviewModal session={session} />, {
                closeOnClickOutside: true,
                isDimmed: true,
                clickThrough: false,
                closeBtn: 'inner',
                width: '30%',
              });
            else
              open(
                <AlertModal
                  title="Empty Session"
                  description="No session information available for this appointment"
                  status="warning"
                  controls={
                    <TextButton
                      text="Confirm"
                      backgroundColor={color.good_green}
                      onPress={() => {
                        close();
                      }}
                    />
                  }
                />,
                DEFAULT_MODAL,
              );
          }}
        />
      )}
    </PreviewWithControls>
  );
}
