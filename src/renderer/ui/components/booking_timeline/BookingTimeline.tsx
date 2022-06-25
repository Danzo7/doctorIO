import { color } from '@assets/styles/color';
import DarkLightCornerButton from '@components/buttons/dark_light_corner_button';
import PreviewList from '@components/preview_list';
import { Appointment } from '@models/instance.model';
import './style/index.scss';
import TimelineItem from './timeline_item';
interface BookedItem {
  id: number;
  state: 'done' | 'done-booked' | 'upcoming' | 'missed';
  bookDate?: Date;
  date?: Date;
  sessionId?: number;
  subject?: string;
  member: { memberId: number; memberName: string };
  assignedBy: { memberId: number; memberName: string };
}
interface BookingTimelineProps {
  patientId: number;
  appointments: Appointment[];
  onPress?: () => void;
}

export default function BookingTimeline({
  appointments,
  patientId,
  onPress,
}: BookingTimelineProps) {
  return (
    <div className="booking-timeline">
      <div
        css={{
          borderLeft: `5px solid ${color.cold_blue}`,
          height: '100%',
          position: 'absolute',
          left: 2.5,
          zIndex: 0,
          top: 48,
        }}
      />

      <PreviewList
        title="Appointment"
        buttonNode={
          <DarkLightCornerButton title="Book appointment" onPress={onPress} />
        }
        gap={10}
        noBorder
      >
        {appointments.map(
          (
            {
              assignedBy,
              member,
              id,
              state,
              bookDate,
              date,
              sessionId,
              subject,
            }: BookedItem,
            index,
          ) => (
            <TimelineItem
              sessionId={sessionId}
              date={date ?? bookDate ?? new Date()}
              assistantId={assignedBy.memberId}
              doctorId={member.memberId}
              doctorName={member.memberName}
              assistantName={assignedBy.memberName}
              type={
                state == 'done-booked'
                  ? {
                      subject: subject as string,
                      booked: true,
                    }
                  : state == 'done'
                  ? {
                      subject: subject as string,
                    }
                  : state
              }
              key={id.toString() + index}
            />
          ),
        )}
      </PreviewList>
    </div>
  );
}
