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
export const FirstStory = Template.bind({});
FirstStory.args = {
  state: 'in queue',
  bookDate: new Date(),
  bookedBy: { memberId: 1, memberName: 'Harnan Mohamed' },
  patientId: 5,
  patientName: 'John cruze',
};
