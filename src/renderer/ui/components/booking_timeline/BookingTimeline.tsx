import { color } from '@assets/styles/color';
import DarkLightCornerButton from '@components/buttons/dark_light_corner_button';
import PreviewList from '@components/preview_list';
import { AppointmentBrief } from '@models/instance.model';
import './style/index.scss';
import TimelineItem from './timeline_item';
import VerticalPanel from '@components/vertical_panel';

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
          borderLeft:
            appointments.length > 0
              ? `5px solid ${color.cold_blue}`
              : undefined,
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
        {appointments.length > 0 ? (
          appointments.map((app, index) => (
            <TimelineItem key={index} {...app} patientId={patientId} />
          ))
        ) : (
          <VerticalPanel title="No appointments" backgroundColor="none" /> //TODO add the correct icon to the vertical panel
        )}
      </PreviewList>
    </div>
  );
}
