import React, { ComponentProps } from 'react';
import type { Story } from '@storybook/react';
import RecentPanel from './RecentPanel';
import BookedItem from '@components/booked_item';
export default {
  title: 'RecentPanel',
  component: RecentPanel,
};
const Template: Story<ComponentProps<typeof RecentPanel>> = (args) => (
  <RecentPanel {...args} />
);
export const FirstStory = Template.bind({});
FirstStory.args = {
  headerText: 'Booked Appointment',
  // in storyBook i can't give it a children without wrapping <></> //
  // but the RecentPanel works without wrapping with <></> (tested) //
  children: (
    <>
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
    </>
  ),
};
