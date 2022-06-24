import { ComponentProps } from 'react';
import type { Story } from '@storybook/react';
import BookingTimeline from './BookingTimeline';
import { appointmentQueue } from '@api/fake';
export default {
  title: 'BookingTimeline',
  component: BookingTimeline,
};
const Template: Story<ComponentProps<typeof BookingTimeline>> = (args) => (
  <BookingTimeline {...args} />
);
export const FirstStory = Template.bind({});
FirstStory.args = {
  appointments: appointmentQueue,
};
