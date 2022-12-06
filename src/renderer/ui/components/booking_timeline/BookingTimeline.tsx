import { color } from '@assets/styles/color';
import DarkLightCornerButton from '@components/buttons/dark_light_corner_button';
import PreviewList from '@components/preview_list';
import { AppointmentBrief } from '@models/instance.model';
import './style/index.scss';
import TimelineItem from './timeline_item';

interface BookingTimelineProps {
  patientId: number;
  appointments: AppointmentBrief[];
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
