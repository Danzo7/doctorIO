import { ComponentProps } from 'react';
import type { Story } from '@storybook/react';
import AppointmentsQueue from './AppointmentsQueue';
export default {
  title: 'AppointmentsQueue/AppointmentsQueue',
  component: AppointmentsQueue,
};
const Template: Story<ComponentProps<typeof AppointmentsQueue>> = () => (
  <AppointmentsQueue />
);
export const FirstStory = Template;
FirstStory.args = {
  cabinState: 'inProgress',
};
