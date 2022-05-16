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
  title: '  Medical history',

  historyList: [
    {
      appointmentDate: '28 Feb 2021',
      appointmentDescription: 'Sick from eating flesh',
      onPress: () => {},
    },
    {
      appointmentDate: '21 Feb 2021',
      appointmentDescription: 'Sick from eating flesh',
      onPress: () => {},
    },
    {
      appointmentDate: '29 Feb 2021',
      appointmentDescription: 'Sick from eating flesh',
      onPress: () => {},
    },
    {
      appointmentDate: '22 Feb 2021',
      appointmentDescription: 'Sick from eating flesh',
      onPress: () => {},
    },
  ],
};
