import { ComponentProps } from 'react';
import type { Story } from '@storybook/react';
import AppointmentHistoryItem from './AppointmentHistoryItem';
export default {
  title: 'AppointmentHistory/AppointmentHistoryItem',
  component: AppointmentHistoryItem,
};
const Template: Story<ComponentProps<typeof AppointmentHistoryItem>> = (
  args,
) => <AppointmentHistoryItem {...args} />;
export const FirstStory = Template;
FirstStory.args = {
  date: new Date('2022-05-01'),
  subject: 'Sick from eating flesh',
};
