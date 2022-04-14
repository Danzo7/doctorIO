import BookedItem from './booked_item';
import SideColumnView from '@components/side_column_view';
import React from 'react';
import './style/index.scss';
interface BookedListProps {}
export default function BookedList({}: BookedListProps) {
  return (
    <div className="booked-list">
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
    </div>
  );
}
