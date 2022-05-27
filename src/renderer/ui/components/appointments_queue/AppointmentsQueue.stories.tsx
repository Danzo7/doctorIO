import { ComponentProps } from 'react';
import type { Story } from '@storybook/react';
import AppointmentsQueue from './AppointmentsQueue';
export default {
  title: 'AppointmentsQueue/AppointmentsQueue',
  component: AppointmentsQueue,
};
const Template: Story<ComponentProps<typeof AppointmentsQueue>> = (args) => (
  <AppointmentsQueue {...args} />
);
export const FirstStory = Template.bind({});
FirstStory.args = {
  cabinState: 'inProgress',
  rollName: 'Doctor',
};
