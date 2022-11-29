import DarkLightCornerButton from '@components/buttons/dark_light_corner_button';
import PreviewList from '@components/preview_list';
import VerticalPanel from '@components/vertical_panel';
import AddSearchToBooked from '@containers/modals/add_search_to_booked';
import { DEFAULT_MODAL } from '@libs/overlay';
import { useGetBookedAppointmentQuery } from '@redux/instance/Appointment/AppointmentApi';
import BookedAppointmentItem from './booked_appointment_item';
import Schedule from 'toSvg/schedule.svg?icon';
import { modal } from '@stores/overlayStore';
import RefetchPanel from '@components/refetch_panel';
import { selectedQueue } from '@stores/queueSelectionStore';

export default function BookedAppointmentPanel({}) {
  const { data, isSuccess, refetch } =
    useGetBookedAppointmentQuery(selectedQueue);

  return (
    <PreviewList
      flexGrow
      title="Booked Appointment"
      buttonNode={
        <DarkLightCornerButton
          text="Add"
          onPress={() => {
            modal(<AddSearchToBooked />, DEFAULT_MODAL).open();
          }}
        />
      }
      noBorder
    >
      {isSuccess && data.length > 0 ? (
        data.map((props, index) => (
          <BookedAppointmentItem {...props} key={index} />
        ))
      ) : isSuccess ? (
        <VerticalPanel
          title="No booked appointments"
          description="Start by booking an appointment. "
          Icon={<Schedule width={'80%'} height="50%" />}
          backgroundColor={'none'}
          padding={'15px 0px 0 0px'}
          alignSelf="center"
          action={{
            text: 'Book appointment',
            onClick() {
              modal(<AddSearchToBooked />, DEFAULT_MODAL).open();
            },
          }}
        />
      ) : (
        <RefetchPanel action={refetch} />
      )}
    </PreviewList>
  );
}
