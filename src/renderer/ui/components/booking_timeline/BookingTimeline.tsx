import { color } from '@assets/styles/color';
import DarkLightCornerButton from '@components/buttons/dark_light_corner_button';
import PreviewList from '@components/preview_list';
import BookAppointmentModal from '@containers/modals/book_appointment_modal';
import { useOverlay } from '@libs/overlay/useOverlay';
import './style/index.scss';
import TimelineItem from './timeline_item';
interface BookingTimelineProps {}
export default function BookingTimeline({}: BookingTimelineProps) {
  const { open } = useOverlay();
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
          <DarkLightCornerButton
            title="Book appointment"
            onPress={() => {
              open(
                <BookAppointmentModal id="123456789" patientName="john Doe" />,
                {
                  closeOnClickOutside: true,
                  isDimmed: true,
                  clickThrough: false,
                  closeBtn: 'inner',
                  width: '30%',
                },
              );
            }}
          />
        }
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
