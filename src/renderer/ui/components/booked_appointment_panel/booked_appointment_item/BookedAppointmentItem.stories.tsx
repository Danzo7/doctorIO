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
  bookTime: new Date('2022-05-01'),
  id: '1',
  memberId: '1',
  memberName: 'John Doe',
  patientId: '1',
  patientName: 'John cruze',
};
