import { color } from '@assets/styles/color';
import PreviewList from '@components/preview_list';
import { AppointmentBrief } from '@models/instance.model';
import './style/index.scss';
import TimelineItem from './timeline_item';
import VerticalPanel from '@components/vertical_panel';
import MultiOptionSwitcher from '@components/buttons/multi_option_switcher';

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
              ? `2px solid ${color.cold_blue}`
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
          <>
            <MultiOptionSwitcher //TODO add an actual input
              textList={['All', 'Upcoming', 'Done', 'Canceled']}
            />
          </>
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
