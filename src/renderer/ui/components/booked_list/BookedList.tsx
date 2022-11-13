import BookedItem from './booked_item';
import PreviewList from '@components/preview_list';
import { useGetBookedAppointmentQuery } from '@redux/instance/Appointment/AppointmentApi';
import LoadingSpinner from '@components/loading_spinner';
import SimpleInfoContainer from '@components/simple_info_container';
import TextButton from '@components/buttons/text_button';
import color from '@assets/styles/color';
import AddSearchToBooked from '@containers/modals/add_search_to_booked';
import { DEFAULT_MODAL } from '@libs/overlay';
import { useOverlay } from '@libs/overlay/useOverlay';

export default function BookedList({}) {
  const { data, isSuccess, isLoading } = useGetBookedAppointmentQuery();
  const { open } = useOverlay();
  return (
    <PreviewList title="Booked appointment">
      {isLoading ? (
        <LoadingSpinner />
      ) : isSuccess ? (
        data.length > 0 ? (
          data.map((props, index) => <BookedItem {...props} key={index} />)
        ) : (
          <SimpleInfoContainer text="No booked appointments">
            <TextButton
              text="Book appointment"
              backgroundColor={color.good_green}
              onPress={() => {
                open(<AddSearchToBooked />, DEFAULT_MODAL);
              }}
            />
          </SimpleInfoContainer>
        )
      ) : (
        <span css={{ alignSelf: 'center' }}>error</span>
      )}
    </PreviewList>
  );
}
