import { ComponentProps } from 'react';
import type { Story } from '@storybook/react';
import AppointmentHistoryItem from './AppointmentHistoryItem';
export default {
  title: 'AppointmentHistoryItem',
  component: AppointmentHistoryItem,
};
const Template: Story<ComponentProps<typeof AppointmentHistoryItem>> = (
  args,
) => <AppointmentHistoryItem {...args} />;
export const FirstStory = Template.bind({});
FirstStory.args = {
  appointmentDate: '28 Feb 2021',
  appointmentDescription: 'Sick from eating flesh',
};
