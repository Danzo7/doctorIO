import BookedItem from './booked_item';
import PreviewList from '@components/preview_list';
import { useGetBookedAppointmentQuery } from '@redux/instance/Appointment/AppointmentApi';
import LoadingSpinner from '@components/loading_spinner';
import SimpleInfoContainer from '@components/simple_info_container';

export default function BookedList({}) {
  const { data, isSuccess, isLoading } = useGetBookedAppointmentQuery();
  //UI: add "add button" to quickly book an appointment
  return (
    <PreviewList title="Booked appointment">
      {isLoading ? (
        <LoadingSpinner />
      ) : isSuccess ? (
        data.length > 0 ? (
          data.map((props, index) => <BookedItem {...props} key={index} />)
        ) : (
          <SimpleInfoContainer text="Empty" />
        )
      ) : (
        <span css={{ alignSelf: 'center' }}>error</span>
      )}
    </PreviewList>
  );
}
