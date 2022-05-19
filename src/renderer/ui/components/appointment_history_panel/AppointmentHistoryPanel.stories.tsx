import { ComponentProps } from 'react';
import type { Story } from '@storybook/react';
import AppointmentHistoryPanel from './AppointmentHistoryPanel';
export default {
  title: 'AppointmentHistory/AppointmentHistory',
  component: AppointmentHistoryPanel,
};
const Template: Story<ComponentProps<typeof AppointmentHistoryPanel>> = (
  args,
) => <AppointmentHistoryPanel {...args} />;
export const FirstStory = Template.bind({});
FirstStory.args = {
  historyList: [
    {
      appointmentDate: '28 Feb 2021',
      appointmentDescription: 'Sick from eating flesh',
      onPressHistory: () => {},
    },
    {
      appointmentDate: '21 Feb 2021',
      appointmentDescription: 'Sick from eating flesh',
      onPressHistory: () => {},
    },
    {
      appointmentDate: '29 Feb 2021',
      appointmentDescription: 'Sick from eating flesh',
      onPressHistory: () => {},
    },
    {
      appointmentDate: '22 Feb 2021',
      appointmentDescription: 'Sick from eating flesh',
      onPressHistory: () => {},
    },
    {
      appointmentDate: '22 Feb 2021',
      appointmentDescription: 'Sick from eating flesh',
      onPressHistory: () => {},
    },
    {
      appointmentDate: '22 Feb 2021',
      appointmentDescription: 'Sick from eating flesh',
      onPressHistory: () => {},
    },
    {
      appointmentDate: '22 Feb 2021',
      appointmentDescription: 'Sick from eating flesh',
      onPressHistory: () => {},
    },
  ],
};
