import { color } from '@assets/styles/color';
import DarkLightCornerButton from '@components/buttons/dark_light_corner_button';
import PreviewList from '@components/preview_list';
import './style/index.scss';
import TimelineItem from './timeline_item';
interface BookingTimelineProps {}
export default function BookingTimeline({}: BookingTimelineProps) {
  return (
    <div className="booking-timeline">
      <div
        css={{
          borderLeft: `5px solid ${color.cold_blue}`,
          height: '100%',
          position: 'absolute',
          left: 2.5,
          zIndex: -1,
          top: 80,
        }}
      />
      <PreviewList
        title="Appointment"
        buttonNode={<DarkLightCornerButton title="Book appointment" />}
        gap={10}
        noBorder
      >
        <TimelineItem type="Upcoming" />
        <TimelineItem type="Missed" />
        <TimelineItem
          type={{
            date: '',
            assistant: 'John',
            doctor: 'John Doe',
            subject: 'Inner bleed',
          }}
        />
        <TimelineItem
          type={{
            done: true,
            date: '',
            assistant: 'John',
            doctor: 'John Doe',
            subject: 'Inner bleed',
          }}
        />
        <TimelineItem
          type={{
            done: true,

            date: '',
            assistant: 'John',
            doctor: 'John Doe',
            subject: 'Inner bleed',
          }}
        />
        <TimelineItem type="Missed" />
      </PreviewList>
    </div>
  );
}
