import { ComponentProps } from 'react';
import type { Story } from '@storybook/react';
import BookedAppointmentItem from './BookedAppointmentItem';
export default {
  title: 'BookedAppointmentItem',
  component: BookedAppointmentItem,
};
const Template: Story<ComponentProps<typeof BookedAppointmentItem>> = (
  args,
) => <BookedAppointmentItem {...args} />;
export const FirstStory = Template;
FirstStory.args = {
  state: 'IN_QUEUE',
  bookedFor: new Date(),
  member: { id: 1, name: 'Harnan Mohamed' },
  patientId: 5,
  patientName: 'John cruze',
};
