import { ComponentProps } from 'react';
import type { Story } from '@storybook/react';
import AppointmentHistory from './AppointmentHistory';
export default {
  title: 'AppointmentHistory',
  component: AppointmentHistory,
};
const Template: Story<ComponentProps<typeof AppointmentHistory>> = (args) => (
  <AppointmentHistory {...args} />
);
export const FirstStory = Template.bind({});
FirstStory.args = {
  appointmentDate: '28 Feb 2021',
  appointmentDescription: 'Sick from eating flesh',
};
