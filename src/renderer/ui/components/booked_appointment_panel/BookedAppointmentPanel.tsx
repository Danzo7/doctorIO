import DarkLightCornerButton from '@components/buttons/dark_light_corner_button';
import PreviewList from '@components/preview_list';
import VerticalPanel from '@components/vertical_panel';
import AddSearchToBooked from '@containers/modals/add_search_to_booked';
import { DEFAULT_MODAL } from '@libs/overlay';
import { useOverlay } from '@libs/overlay/useOverlay';
import { useGetBookedAppointmentQuery } from '@redux/instance/Appointment/AppointmentApi';
import BookedAppointmentItem from './booked_appointment_item';
import Schedule from 'toSvg/schedule.svg?icon';

export default function BookedAppointmentPanel({}) {
  const { data, isSuccess } = useGetBookedAppointmentQuery();
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
      {isSuccess && data.length > 0 ? (
        data.map((props, index) => (
          <BookedAppointmentItem {...props} key={index} />
        ))
      ) : (
        <VerticalPanel
          title="No booked appointments"
          description="Start by booking an appointment. "
          Icon={<Schedule width={'80%'} height="50%" />}
          backgroundColor={'none'}
          padding={'15px 0px 0 0px'}
          action={{
            text: 'Book appointment',
            onClick() {
              open(<AddSearchToBooked />, DEFAULT_MODAL);
            },
          }}
        />
      )}
    </PreviewList>
  );
}
