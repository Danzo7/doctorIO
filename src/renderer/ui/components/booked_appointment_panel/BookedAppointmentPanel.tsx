import DarkLightCornerButton from '@components/buttons/dark_light_corner_button';
import PreviewList from '@components/preview_list';
import AddSearchToBooked from '@containers/modals/add_search_to_booked';
import { DEFAULT_MODAL } from '@libs/overlay';
import { useOverlay } from '@libs/overlay/useOverlay';
import { useAppSelector } from '@store';
import BookedAppointmentItem from './booked_appointment_item';

export default function BookedAppointmentPanel({}) {
  const bookedAppointments = useAppSelector((state) => state.bookedAppointment);
  const { open } = useOverlay();
  return (
    <PreviewList
      flexGrow
      title="Booked Appointment"
      buttonNode={
        <DarkLightCornerButton
          text="Add"
          onPress={() => {
            open(<AddSearchToBooked />, DEFAULT_MODAL);
          }}
        />
      }
      noBorder
    >
      {bookedAppointments.map((props, index) => (
        <BookedAppointmentItem {...props} key={index} />
      ))}
    </PreviewList>
  );
}
