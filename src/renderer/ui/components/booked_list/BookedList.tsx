import BookedItem from './booked_item';
import PreviewList from '@components/preview_list';
import colors from '@assets/styles/color';
import TextButton from '@components/buttons/text_button';
import useNavigation from '@libs/hooks/useNavigation';
interface BookedListProps {}
export default function BookedList({}: BookedListProps) {
  const { navigate } = useNavigation();

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
      <BookedItem
        name="John Doe"
        bookTime="booked  20 days ago"
        state="panding"
      />
      <BookedItem
        name="John Doe"
        bookTime="booked  20 days ago"
        state="panding"
      />
      <BookedItem
        name="John Doe"
        bookTime="booked  20 days ago"
        state="panding"
      />
    </PreviewList>
  );
}
