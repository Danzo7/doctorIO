import BookedItem from './booked_item';
import SideColumnView from '@components/side_column_view';
interface BookedListProps {}
export default function BookedList({}: BookedListProps) {
  return (
    <SideColumnView headerText="Booked appointment">
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
    </SideColumnView>
  );
}
