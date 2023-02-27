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
import { useSelectedQueue } from '@stores/queueSelectionStore';

export default function BookedList({}) {
  const selectedQueue = useSelectedQueue();
  const { data, isSuccess, isLoading, isFetching, refetch } =
    useGetBookedAppointmentQuery(selectedQueue);

  return (
    <PreviewList
      title="Booked appointment"
      isLoading={isLoading}
      isFetching={isFetching}
    >
      {isLoading ? (
        <LoadingSpinner />
      ) : isSuccess ? (
        data.length > 0 ? (
          data.map((props, index) => <BookedItem {...props} key={index} />)
        ) : (
          <VerticalPanel
            title="No booked appointments"
            description="Start by booking an appointment. "
            Icon={<Schedule width={'60%'} height="60%" />}
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
