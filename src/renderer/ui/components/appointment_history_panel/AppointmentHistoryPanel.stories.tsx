import { ComponentProps } from 'react';
import type { Story } from '@storybook/react';
import AppointmentHistoryPanel from './AppointmentHistoryPanel';
export default {
  title: 'AppointmentHistory/AppointmentHistoryPanel',
  component: AppointmentHistoryPanel,
};
const Template: Story<ComponentProps<typeof AppointmentHistoryPanel>> = (
  args,
) => <AppointmentHistoryPanel {...args} />;
export const FirstStory = Template;
FirstStory.args = {};
