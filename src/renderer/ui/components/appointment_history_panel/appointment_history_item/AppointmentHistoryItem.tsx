import SquareIconButton from '@components/buttons/square_icon_button/SquareIconButton';
import PreviewWithControls from '@components/preview_with_controls';
import { DATE_ONLY } from '@constants/data_format';
import SessionPreviewModal from '@containers/modals/session_preview_modal';
import { Appointment } from '@models/instance.model';
import { modal } from '@stores/overlayStore';
import { format } from 'date-fns';
import AppointmentHistoryIcon from 'toSvg/appointment_history.svg?icon';

export default function AppointmentHistoryItem({
  date,
  subject,
  session,
  assignedBy,
  bookedIn,
  bookedFor,
  member,
  patientName,
  patientAge,
}: Pick<
  Appointment,
  | 'date'
  | 'subject'
  | 'session'
  | 'assignedBy'
  | 'bookedIn'
  | 'bookedFor'
  | 'member'
> & { patientName: string; patientAge: number }) {
  return (
    <PreviewWithControls
      primaryText={date ? format(date, DATE_ONLY) : ''}
      secondaryText={subject ? subject : 'Untitled'}
    >
      {session && Object.keys(session).length > 0 && (
        <SquareIconButton
          Icon={AppointmentHistoryIcon}
          tip="View Session"
          onPress={() => {
            modal(
              () => (
                <SessionPreviewModal
                  session={session}
                  bookedBy={assignedBy.memberName}
                  bookedIn={bookedIn}
                  memberName={member?.memberName}
                  subject={subject}
                  patientName={patientName}
                  patientAge={patientAge}
                />
              ),
              {
                closeOnClickOutside: true,
                isDimmed: true,
                clickThrough: false,
                closeBtn: 'inner',
                width: '50%',
              },
            ).open();
          }}
        />
      )}
    </PreviewWithControls>
  );
}
