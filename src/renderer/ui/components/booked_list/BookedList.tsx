import BookedItem from './booked_item';
import PreviewList from '@components/preview_list';
import colors, { color } from '@assets/styles/color';
import TextButton from '@components/buttons/text_button';
import useNavigation from '@libs/hooks/useNavigation';
import { Overlay } from '@libs/overlay';
import Tooltip from '@components/poppers/tooltip';
interface BookedListProps {}
export default function BookedList({}: BookedListProps) {
  const { navigate } = useNavigation();
  const openTooltip = () => {
    Overlay.open(
      <Tooltip
        actionList={[
          {
            text: 'Add to queue',
            fontColor: color.white,
          },
          {
            text: 'View records',
            fontColor: color.white,
          },
          {
            text: 'Remove',
            fontColor: color.hot_red,
          },
        ]}
      />,
      {
        closeOnClickOutside: true,
        clickThrough: false,
        position: { top: '30%' },
      },
    );
  };
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
        onPressMenu={openTooltip}
      />
      <BookedItem
        name="John Doe"
        bookTime="booked  20 days ago"
        state="panding"
        onPressMenu={openTooltip}
      />
      <BookedItem
        name="John Doe"
        bookTime="booked  20 days ago"
        state="panding"
        onPressMenu={openTooltip}
      />
    </PreviewList>
  );
}
