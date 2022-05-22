import { ComponentProps } from 'react';
import type { Story } from '@storybook/react';
import AppointmentsCurrentPatient from './AppointmentsCurrentPatient';
export default {
  title: 'AppointmentsQueue/AppointmentsCurrentPatient',
  component: AppointmentsCurrentPatient,
};
const Template: Story<ComponentProps<typeof AppointmentsCurrentPatient>> = (
  args,
) => <AppointmentsCurrentPatient {...args} />;
export const FirstStory = Template.bind({});
FirstStory.args = {
  patientName: 'John doe',
  duration: '5min ago',
  patientNumber: 50,
};
