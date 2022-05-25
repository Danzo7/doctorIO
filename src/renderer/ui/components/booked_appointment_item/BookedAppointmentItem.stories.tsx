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
  patientFullName: 'John Doe',
  BookedInDate: '28 Feb 2021',
  BookedByFullName: 'brahim aymen',
};
