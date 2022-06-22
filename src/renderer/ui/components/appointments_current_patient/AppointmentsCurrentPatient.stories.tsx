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
  arrivalTime: new Date('2022-06-22T19:39:40.000Z'),
  position: 50,
};
