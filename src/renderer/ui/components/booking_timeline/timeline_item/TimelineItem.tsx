import WideCard from '@components/wide_card';
import './style/index.scss';
import TextPair from '@components/text_pair';
import SquareIconButton from '@components/buttons/square_icon_button/SquareIconButton';
import View from 'toSvg/view_test.svg?icon';
import { color } from '@assets/styles/color';
import { useOverlay } from '@libs/overlay/useOverlay';
import SessionPreviewModal from '@containers/modals/session_preview_modal';
import { format } from 'date-fns';
import { DATE_ONLY, TIME_ONLY } from '@constants/data_format';
import { Appointment } from '@models/instance.model';

export default function TimelineItem({
  bookedIn,
  state,
  subject,
  assignedBy,
  member,
  bookedFor,
  date,
  session,
}: Appointment) {
  const selectedColor =
    state == 'done-booked'
      ? color.good_green
      : state == 'missed' || state == 'canceled'
      ? color.cold_red
      : state == 'upcoming' || state == 'opened'
      ? color.warm_orange
      : color.cold_blue;
  const { open } = useOverlay();
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
            first={
              state == 'canceled'
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

          {subject && <TextPair first={subject} second="Subject" reversed />}
          {member && (
            <TextPair first={member?.memberName} second="Treated by" reversed />
          )}
          <TextPair
            first={assignedBy?.memberName}
            second="Assigned by"
            reversed
          />
          {session && (
            <SquareIconButton
              Icon={View}
              onPress={() => {
                open(<SessionPreviewModal />, {
                  //TODO update session preview modal to take session object
                  closeOnClickOutside: true,
                  isDimmed: true,
                  clickThrough: false,
                  closeBtn: 'inner',
                  width: '50%',
                });
              }}
            />
          )}
          {state != 'done' && state != 'done-booked' && (
            <TextPair second="State" first={state} reversed />
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
                first="Booked appointment"
                second={format(bookedIn, DATE_ONLY)}
              />
              <TextPair second="State" first={state} reversed />
            </WideCard>
          </>
        )}
      </div>
    </div>
  );
}
