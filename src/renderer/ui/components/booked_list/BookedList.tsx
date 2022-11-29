import BookedItem from './booked_item';
import PreviewList from '@components/preview_list';
import { useGetBookedAppointmentQuery } from '@redux/instance/Appointment/AppointmentApi';
import LoadingSpinner from '@components/loading_spinner';
import VerticalPanel from '@components/vertical_panel';
import Schedule from 'toSvg/schedule.svg?icon';
import AddSearchToBooked from '@containers/modals/add_search_to_booked';
import { DEFAULT_MODAL } from '@libs/overlay';
import { modal } from '@stores/overlayStore';
import RefetchPanel from '@components/refetch_panel';
import { useQueueSelectionStore } from '@stores/queueSelectionStore';

export default function BookedList({}) {
  const selectedQueue = useQueueSelectionStore.getState().selectedQueue;
  const { data, isSuccess, isLoading, refetch } =
    useGetBookedAppointmentQuery(selectedQueue);

  return (
    <PreviewList title="Booked appointment">
      {isLoading ? (
        <LoadingSpinner />
      ) : isSuccess ? (
        data.length > 0 ? (
          data.map((props, index) => <BookedItem {...props} key={index} />)
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
                modal(() => <AddSearchToBooked />, DEFAULT_MODAL).open();
              },
            }}
          />
        )
      ) : (
        <RefetchPanel action={refetch} />
      )}
    </PreviewList>
  );
}
