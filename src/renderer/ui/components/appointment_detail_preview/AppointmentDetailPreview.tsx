import { color } from '@assets/styles/color';
import NotAButton from '@components/not_a_button';
import TextPair from '@components/text_pair/TextPair';
import { SETTINGS } from '@stores/appSettingsStore';

import { Appointment } from '@models/instance.model';
import { format } from 'date-fns';
import './style/index.scss';
import SmallUserStatus from '@components/small_user_status';
import { modal } from '@stores/overlayStore';
import MemberBigCard from '@containers/modals/member_big_card';
import { DEFAULT_MODAL } from '@libs/overlay';

export default function AppointmentDetailPreview({
  assignedBy,
  member,
  queue,
  state,
  bookedIn,
  bookedFor,
  date,
  subject,
}: Appointment) {
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
  return (
    <div className="appointment-detail-preview">
      <div>
        <TextPair
          gap={2}
          first={{
            text: 'Type',
            fontSize: 12,
            fontWeight: 600,
            fontColor: color.text_gray,
          }}
          second={{
            text: state.isBooked ? 'Booked' : 'Directly assigned',
            fontSize: 15,
            fontWeight: 600,
            fontColor: color.white,
          }}
        />

        {bookedFor && (
          <TextPair
            gap={2}
            first={{
              text: 'Booked for',
              fontSize: 12,
              fontWeight: 600,
              fontColor: color.text_gray,
            }}
            second={{
              text: format(bookedFor, SETTINGS.dateFormat),
              fontSize: 15,
              fontWeight: 600,
              fontColor: color.white,
            }}
          />
        )}
        {subject && (
          <TextPair
            gap={2}
            first={{
              text: 'Subject',
              fontSize: 12,
              fontWeight: 600,
              fontColor: color.text_gray,
            }}
            second={{
              text: subject,
              fontSize: 15,
              fontWeight: 600,
              fontColor: color.white,
            }}
          />
        )}

        <TextPair
          gap={2}
          first={{
            text: 'State',
            fontSize: 12,
            fontWeight: 600,
            fontColor: color.text_gray,
          }}
          second={
            <NotAButton
              fontSize={12}
              backgroundColor={selectedColor}
              text={state.phase}
              padding={5}
              radius={5}
              fontWeight={700}
            />
          }
        />

        {queue && (
          <TextPair
            gap={2}
            first={{
              text: 'Queue',
              fontSize: 12,
              fontWeight: 600,
              fontColor: color.text_gray,
            }}
            second={{
              text: queue.name,
              fontSize: 15,
              fontWeight: 600,
              fontColor: color.white,
            }}
          />
        )}
      </div>

      <div>
        <TextPair
          gap={2}
          first={{
            text: 'Created by',
            fontSize: 12,
            fontWeight: 600,
            fontColor: color.text_gray,
          }}
          second={
            <SmallUserStatus
              alt="member"
              imgSrc={assignedBy.avatar}
              name={assignedBy.name}
              onClick={() => {
                modal(
                  <MemberBigCard id={assignedBy.id} />,
                  DEFAULT_MODAL,
                ).open();
              }}
            />
          }
        />

        <TextPair
          gap={2}
          first={{
            text: 'Created in',
            fontSize: 12,
            fontWeight: 600,
            fontColor: color.text_gray,
          }}
          second={{
            text: format(bookedIn, SETTINGS.dateFormat),
            fontSize: 15,
            fontWeight: 600,
            fontColor: color.white,
          }}
        />
      </div>
      {date && (
        <div>
          {member && (
            <TextPair
              gap={2}
              first={{
                text: state.phase == 'done' ? 'Treated by' : 'Canceled by',
                fontSize: 12,
                fontWeight: 600,
                fontColor: color.text_gray,
              }}
              second={
                <SmallUserStatus
                  alt={member.name}
                  imgSrc={member.avatar}
                  name={member.name}
                  onClick={() => {
                    modal(
                      <MemberBigCard id={member.id} />,
                      DEFAULT_MODAL,
                    ).open();
                  }}
                />
              }
            />
          )}
          {
            <TextPair
              gap={2}
              first={{
                text: state.phase == 'done' ? 'Treated in' : 'Canceled in',
                fontSize: 12,
                fontWeight: 600,
                fontColor: color.text_gray,
              }}
              second={{
                text: format(date, SETTINGS.dateFormat),
                fontSize: 15,
                fontWeight: 600,
                fontColor: color.white,
              }}
            />
          }
        </div>
      )}
    </div>
  );
}
