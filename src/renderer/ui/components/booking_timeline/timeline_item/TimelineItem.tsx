import WideCard from '@components/wide_card';
import './style/index.scss';
import TextPair from '@components/text_pair';
import SquareIconButton from '@components/buttons/square_icon_button/SquareIconButton';
import View from 'toSvg/view_test.svg?icon';
import { color } from '@assets/styles/color';
import SessionPreviewModal from '@containers/modals/session_preview_modal';
import { format } from 'date-fns';
import { SETTINGS } from '@stores/appSettingsStore';
import { AppointmentBrief } from '@models/instance.model';
import { useGetPatientDetailQuery } from '@redux/instance/record/patient_api';
import { modal } from '@stores/overlayStore';
import NotAButton from '@components/not_a_button';
import { DEFAULT_MODAL, FIT_MODAL } from '@libs/overlay';
import SmallUserStatus from '@components/small_user_status';
import MemberBigCard from '@containers/modals/member_big_card';

export default function TimelineItem({
  state,
  subject,
  assignedBy,
  bookedFor,
  date,
  patientId,
  id,
}: AppointmentBrief & { patientId: number }) {
  const selectedColor =
    state.phase == 'done'
      ? state.isBooked
        ? color.good_green
        : color.cold_blue
      : state.phase == 'missed' || state.phase == 'canceled'
      ? color.cold_red
      : state.phase == 'upcoming' ||
        state.phase == 'opened' ||
        state.phase == 'in queue'
      ? color.warm_orange
      : color.white;

  const { isLoading, data, isSuccess } = useGetPatientDetailQuery(patientId);
  return (
    <div className="timeline-item">
      <div
        className="dot"
        css={{
          backgroundColor: selectedColor,
        }}
      />
      <div className="event">
        <WideCard borderColor={selectedColor}>
          <>
            <NotAButton
              fontSize={12}
              backgroundColor={selectedColor}
              text={state.phase}
              padding={5}
              radius={5}
              fontWeight={400}
            />
            {state.isBooked && state.phase != 'upcoming' && (
              <NotAButton
                fontSize={12}
                backgroundColor={color.hot_purple}
                text="booked"
                padding={5}
                radius={5}
                fontWeight={400}
              />
            )}
          </>
          {date && (
            <TextPair
              gap={2}
              first={{ text: format(date, SETTINGS.dateFormat), fontSize: 14 }}
              second={format(date, SETTINGS.timeFormat)}
            />
          )}

          {subject && state.phase != 'canceled' && (
            <TextPair
              gap={2}
              first={{ text: subject, fontSize: 14 }}
              second="Subject"
              reversed
            />
          )}
          {bookedFor && (
            <TextPair
              gap={2}
              first={{
                text: format(bookedFor, SETTINGS.dateFormat),
                fontSize: 14,
              }}
              second={'Booked for'}
              reversed
            />
          )}
          {state.phase != 'canceled' &&
            state.phase != 'missed' && ( //TODO check if its me show me
              <TextPair
                gap={3}
                first={
                  <SmallUserStatus
                    alt={assignedBy.name}
                    name={assignedBy.name}
                    imgSrc={assignedBy.avatar}
                    onClick={() => {
                      modal(
                        <MemberBigCard id={assignedBy.id} />,
                        DEFAULT_MODAL,
                      ).open();
                    }}
                  />
                }
                second="Assigned by"
                reversed
              />
            )}

          <SquareIconButton
            Icon={View}
            tip="View Session"
            disabled={isLoading || !isSuccess}
            onPress={() => {
              modal(() => <SessionPreviewModal id={id} patient={data!} />, {
                ...FIT_MODAL,
                style: { maxWidth: 600 },
              }).open();
            }}
          />
        </WideCard>
      </div>
    </div>
  );
}
