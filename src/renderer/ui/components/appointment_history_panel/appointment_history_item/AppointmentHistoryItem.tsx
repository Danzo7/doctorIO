import PreviewWithControls from '@components/preview_with_controls';
import { SETTINGS } from '@stores/appSettingsStore';

import { AppointmentBrief } from '@models/instance.model';
import { format } from 'date-fns';

export default function AppointmentHistoryItem({
  date,
  subject,
  id,
}: Pick<AppointmentBrief, 'date' | 'subject' | 'id'>) {
  return (
    <PreviewWithControls
      primaryText={date ? format(date, SETTINGS.dateFormat) : ''}
      secondaryText={subject ? subject : 'Untitled'}
    >
      {/* {session && Object.keys(session).length > 0 && (//TODO: add session preview modal
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
      )} */}
    </PreviewWithControls>
  );
}
