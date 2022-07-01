import BookedItem from './booked_item';
import PreviewList from '@components/preview_list';
import colors from '@assets/styles/color';
import TextButton from '@components/buttons/text_button';
import useNavigation from '@libs/hooks/useNavigation';
import { bookedAppointments } from '@api/fake';

export default function BookedList({}) {
  const { navigate } = useNavigation();
  //REDUX fetch bookedAppointments list
  return (
    <PreviewList
      title="Booked appointment"
      buttonNode={
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
      }
    >
      {bookedAppointments.map((props, index) => (
        <BookedItem {...props} key={index} />
      ))}
    </PreviewList>
  );
}
