import DarkLightCornerButton from '@components/buttons/dark_light_corner_button';
import PreviewList from '@components/preview_list';
import AddSearchToBooked from '@containers/modals/add_search_to_booked';
import { useOverlay } from '@libs/overlay/useOverlay';
import BookedAppointmentItem from './booked_appointment_item';
interface BookedAppointmentPanelProps {
  bookedAppointmentData: any[];
}
export default function BookedAppointmentPanel({
  bookedAppointmentData = [],
}: BookedAppointmentPanelProps) {
  const { open } = useOverlay();
  return (
    <PreviewList
      title="Booked Appointment"
      buttonNode={
        <DarkLightCornerButton
          title="Add"
          onPress={() => {
            open(<AddSearchToBooked />, {
              closeOnClickOutside: true,
              isDimmed: true,
              clickThrough: false,
              width: '30%',
              closeBtn: 'inner',
            });
          }}
        />
      }
      noBorder
      maxHeight={400}
    >
      {bookedAppointmentData.map(
        ({ BookedByFullName, patientFullName, BookedInDate }) => (
          <BookedAppointmentItem
            patientFullName={patientFullName}
            BookedInDate={BookedInDate}
            BookedByFullName={BookedByFullName}
            key={BookedInDate}
          />
        ),
      )}
    </PreviewList>
  );
}
