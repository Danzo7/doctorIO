import WideCard from '@components/wide_card';
import './style/index.scss';
import TextPair from '@components/text_pair';
import SquareIconButton from '@components/buttons/square_icon_button/SquareIconButton';
import View from 'toSvg/view_test.svg?icon';
import { color } from '@assets/styles/color';
import SessionPreviewModal from '@containers/modals/session_preview_modal';
import { format } from 'date-fns';
import { DATE_ONLY, TIME_ONLY_24H } from '@constants/data_format';
import { AppointmentBrief } from '@models/instance.model';
import { useGetPatientDetailQuery } from '@redux/instance/record/patient_api';
import { modal } from '@stores/overlayStore';
import NotAButton from '@components/not_a_button';
import CircleAvatar from '@components/avatars/circle_avatar';
import MemberBigCard from '@containers/modals/member_big_card';
import { DEFAULT_MODAL, FIT_MODAL } from '@libs/overlay';

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
          boxShadow: `0 0px 1px ${selectedColor} inset, 0 0 3px`,
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
              first={format(date, DATE_ONLY)}
              second={format(date, TIME_ONLY_24H)}
            />
          )}

          {subject && state.phase != 'canceled' && (
            <TextPair gap={2} first={subject} second="Subject" reversed />
          )}
          {bookedFor && (
            <TextPair
              gap={2}
              first={format(bookedFor, DATE_ONLY)}
              second={'Booked for'}
              reversed
            />
          )}
          {state.phase != 'canceled' &&
            state.phase != 'missed' && ( //TODO check if its me show me
              <TextPair
                gap={3}
                first={
                  //TODO move to a separated component
                  <CircleAvatar
                    src={assignedBy.avatar}
                    alt={assignedBy.name}
                    width={25}
                    onClick={() =>
                      modal(
                        <MemberBigCard id={assignedBy.id} />,
                        DEFAULT_MODAL,
                      ).open()
                    }
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
              modal(
                () => (
                  <SessionPreviewModal
                    id={id}
                    patientAge={data?.age}
                    patientName={data?.firstName + ' ' + data?.lastName}
                  />
                ),
                FIT_MODAL,
              ).open();
            }}
          />
        </WideCard>
      </div>
    </div>
  );
}
