import WideCard from '@components/wide_card';
import './style/index.scss';
import TextPair from '@components/text_pair';
import SquareIconButton from '@components/buttons/square_icon_button/SquareIconButton';
import View from 'toSvg/view_test.svg?icon';
import { color } from '@assets/styles/color';
import SessionPreviewModal from '@containers/modals/session_preview_modal';
import { format } from 'date-fns';
import { DATE_ONLY, TIME_ONLY } from '@constants/data_format';
import { Appointment } from '@models/instance.model';
import { useGetPatientDetailQuery } from '@redux/instance/record/patient_api';
import { modal } from '@stores/overlayStore';

export default function TimelineItem({
  bookedIn,
  state,
  subject,
  assignedBy,
  member,
  bookedFor,
  date,
  session,
  patientId,
}: Appointment & { patientId: number }) {
  const selectedColor =
    state == 'done-booked'
      ? color.good_green
      : state == 'missed' || state == 'canceled'
      ? color.cold_red
      : state == 'upcoming' || state == 'opened'
      ? color.warm_orange
      : color.cold_blue;

  const { isLoading, data, isSuccess } = useGetPatientDetailQuery(patientId);
  return (
    <div className="timeline-item">
      <div
        className="dot"
        css={{
          backgroundColor: selectedColor,
          boxShadow: `0 0px 1px ${selectedColor} inset, 0 0 3px`,
        }}
      />
      <div className="event">
        <WideCard borderColor={selectedColor}>
          <TextPair
            gap={2}
            first={
              state == 'canceled' && bookedFor
                ? 'Booked appointment'
                : state == 'canceled'
                ? 'Unprogrammed appointment'
                : date
                ? format(date, DATE_ONLY)
                : state == 'opened'
                ? 'Unprogrammed appointment'
                : 'Booked appointment'
            }
            second={
              date
                ? format(date, TIME_ONLY)
                : bookedFor
                ? format(bookedFor, DATE_ONLY)
                : 'Not programed'
            }
          />

          {subject && (
            <TextPair gap={2} first={subject} second="Subject" reversed />
          )}
          {member && (
            <TextPair
              gap={2}
              first={member.memberName}
              second="Treated by"
              reversed
            />
          )}
          <TextPair
            gap={2}
            first={assignedBy?.memberName}
            second="Assigned by"
            reversed
          />
          {session && Object.keys(session).length > 0 && (
            <SquareIconButton
              Icon={View}
              tip="View Session"
              disabled={isLoading || !isSuccess}
              onPress={() => {
                modal(
                  () => (
                    <SessionPreviewModal
                      session={session}
                      memberName={member?.memberName || 'unknown'}
                      patientAge={data?.age}
                      patientName={data?.firstName + ' ' + data?.lastName}
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
          {((state == 'done' && !bookedFor) ||
            (state != 'done' && state != 'done-booked')) && (
            <TextPair gap={2} second="State" first={state} reversed />
          )}
        </WideCard>

        {state == 'done-booked' && (
          <>
            <div
              css={{
                borderLeft: `3px solid ${selectedColor}`,
                height: 5,
                marginLeft: 10,
              }}
            />
            <WideCard borderColor={selectedColor}>
              <TextPair
                gap={2}
                first="Booked appointment"
                second={format(bookedIn, DATE_ONLY)}
              />
              <TextPair gap={2} second="State" first={state} reversed />
            </WideCard>
          </>
        )}
      </div>
    </div>
  );
}
