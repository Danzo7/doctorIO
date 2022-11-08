import BookedItem from './booked_item';
import PreviewList from '@components/preview_list';
import colors from '@assets/styles/color';
import TextButton from '@components/buttons/text_button';
import useNavigation from '@libs/hooks/useNavigation';
import { useGetBookedAppointmentQuery } from '@redux/instance/Appointment/AppointmentApi';
import LoadingSpinner from '@components/loading_spinner';
import SimpleInfoContainer from '@components/simple_info_container';

export default function BookedList({}) {
  const { data, isSuccess, isLoading } = useGetBookedAppointmentQuery();
  const { navigate } = useNavigation();

  return (
    <PreviewList
      title="Booked appointment"
      buttonNode={
        isSuccess &&
        data.length > 0 && (
          <TextButton
            text="show all"
            fontColor={colors.text_gray}
            afterBgColor={colors.secondary_color}
            fontSize={14}
            radius={10}
            onPress={() => {
              navigate('/queue');
            }}
          />
        )
      }
    >
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
