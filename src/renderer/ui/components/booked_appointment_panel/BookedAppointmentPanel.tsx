import PreviewList from '@components/preview_list';
import BookedAppointmentItem from './booked_appointment_item';
interface BookedAppointmentPanelProps {
  bookedAppointmentData: any[];
}
export default function BookedAppointmentPanel({
  bookedAppointmentData = [],
}: BookedAppointmentPanelProps) {
  return (
    <PreviewList title="Booked Appointment" noBorder maxHeight={400}>
      {bookedAppointmentData.map(
        ({ BookedByFullName, patientFullName, BookedInDate }) => (
          <BookedAppointmentItem
            patientFullName={patientFullName}
            BookedInDate={BookedInDate}
            BookedByFullName={BookedByFullName}
            key={BookedInDate}
            onAssign={() => {}}
          />
        ),
      )}
    </PreviewList>
  );
}
