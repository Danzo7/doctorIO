import { ComponentProps } from 'react';
import type { Story } from '@storybook/react';
import BookingTimeline from './BookingTimeline';
export default {
  title: 'BookingTimeline',
  component: BookingTimeline,
};
const Template: Story<ComponentProps<typeof BookingTimeline>> = (args) => (
  <BookingTimeline {...args} />
);
export const FirstStory = Template.bind({});
FirstStory.args = {
  appointments: [
    {
      assistantId: 2,
      doctorId: 1,
      id: 2,
      state: 'upcoming',
      bookDate: new Date('2022-01-01'),
      doctorName: 'John Doe',
      assistantName: 'Michel paradox',
    },
    {
      assistantId: 2,
      doctorId: 1,
      id: 1,
      state: 'done-booked',
      bookDate: new Date('2022-01-01'),
      date: new Date('2022-01-01'),
      sessionId: 1,
      subject: 'Inner bleed',
      doctorName: 'John Doe',
      assistantName: 'Michel paradox',
    },
    {
      assistantId: 2,
      doctorId: 1,
      id: 2,
      state: 'done',
      date: new Date('2022-01-01'),
      sessionId: 4,
      subject: 'Inner bleed',
      doctorName: 'John Doe',
      assistantName: 'Michel paradox',
    },
    {
      assistantId: 2,
      doctorId: 1,
      id: 2,
      state: 'missed',
      bookDate: new Date('2022-02-01'),
      doctorName: 'John Doe',
      assistantName: 'Michel paradox',
    },
    {
      assistantId: 2,
      doctorId: 1,
      id: 2,
      state: 'done',
      date: new Date('2022-04-04'),
      sessionId: 1,
      subject: 'Inner bleed',
      doctorName: 'John Doe',
      assistantName: 'Michel paradox',
    },
  ],
};
