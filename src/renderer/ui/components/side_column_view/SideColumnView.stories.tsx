import { ComponentProps } from 'react';
import type { Story } from '@storybook/react';
import SideColumnView from './SideColumnView';
import BookedItem from '@components/booked_list/booked_item';
export default {
  title: 'SideColumnView',
  component: SideColumnView,
};
const Template: Story<ComponentProps<typeof SideColumnView>> = (args) => (
  <SideColumnView {...args} />
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

/*

       <LastDmMessage
        imgSrc={client}
        status={true}
        lastMessage="hellodgggggg ggggggg ggggggg gggggg ggggg there"
      />
      <LastDmMessage
        imgSrc={client}
        status={true}
        lastMessage="hello gggggggggggthere"
      />
      <LastDmMessage imgSrc={client} status={true} lastMessage="hello there" />
      <LastDmMessage imgSrc={client} status={true} lastMessage="hello there" />

      */
