import { ComponentProps } from 'react';
import type { Story } from '@storybook/react';
import BookedAppointmentPanel from './BookedAppointmentPanel';
export default {
  title: 'BookedAppointmentPanel',
  component: BookedAppointmentPanel,
};
const Template: Story<ComponentProps<typeof BookedAppointmentPanel>> = (
  args,
) => <BookedAppointmentPanel {...args} />;
export const FirstStory = Template.bind({});
FirstStory.args = {
  bookedAppointmentData: [
    {
      patientFullName: 'John Doe',
      BookedInDate: '28 Feb 2021',
      BookedByFullName: 'brahim aymen',
    },
    {
      patientFullName: 'John Doe',
      BookedInDate: '29 Feb 2021',
      BookedByFullName: 'brahim aymen',
    },
    {
      patientFullName: 'John Doe',
      BookedInDate: '02 Feb 2021',
      BookedByFullName: 'brahim aymen',
    },
  ],
};
