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
          <DarkLightCornerButton text="Book appointment" onPress={onPress} />
        }
        gap={10}
        noBorder
      >
        {appointments.map((app, index) => (
          <TimelineItem key={index} {...app} patientId={patientId} />
        ))}
      </PreviewList>
    </div>
  );
}
