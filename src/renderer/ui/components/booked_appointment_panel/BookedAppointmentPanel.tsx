import DarkLightCornerButton from '@components/buttons/dark_light_corner_button';
import PreviewList from '@components/preview_list';
import VerticalPanel from '@components/vertical_panel';
import AddSearchToBooked from '@containers/modals/add_search_to_booked';
import { DEFAULT_MODAL, modal } from '@libs/overlay';
import { useGetBookedAppointmentQuery } from '@redux/instance/Appointment/AppointmentApi';
import BookedAppointmentItem from './booked_appointment_item';
import Schedule from 'toSvg/schedule.svg?icon';

import RefetchPanel from '@components/refetch_panel';
import { useQueueSelectionStore } from '@stores/queueSelectionStore';

export default function BookedAppointmentPanel({}) {
  const selectedQueue = useQueueSelectionStore.getState().selectedQueue;
  const {
    data,
    isSuccess,
    isLoading,
    isFetching,
    refetch,
    isError,
    isUninitialized,
  } = useGetBookedAppointmentQuery(selectedQueue);

  return (
    <PreviewList
      flexGrow
      maxHeight={275}
      title="Booked Appointment"
      buttonNode={
        <DarkLightCornerButton
          text="Add"
          onPress={() => {
            modal(<AddSearchToBooked />, DEFAULT_MODAL).open();
          }}
        />
      }
      isLoading={isLoading || isUninitialized}
      isFetching={isFetching}
      noBorder
    >
      {isSuccess ? (
        data.length > 0 ? (
          data.map((props, index) => (
            <BookedAppointmentItem {...props} key={index} />
          ))
        ) : (
          <VerticalPanel
            title="No booked appointments"
            description="Start by booking an appointment. "
            Icon={<Schedule width="60%" height="60%" />}
            padding={0}
            alignSelf="center"
            action={{
              text: 'Book appointment',
              onClick() {
                modal(<AddSearchToBooked />, DEFAULT_MODAL).open();
              },
            }}
          />
        )
      ) : (
        isError && <RefetchPanel action={refetch} />
      )}
    </PreviewList>
  );
}
