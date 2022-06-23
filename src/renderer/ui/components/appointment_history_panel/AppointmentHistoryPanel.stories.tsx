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
export const FirstStory = Template.bind({});
FirstStory.args = {
  list: [
    {
      date: new Date('2022-05-01'),
      description: 'Sickness for the day',
      id: '1',
    },
    {
      date: new Date('2022-05-02'),
      description: 'dead inside',
      id: '2',
    },
    {
      date: new Date('2022-05-03'),
      description: 'good health',
      id: '3',
    },
    {
      date: new Date('2022-05-04'),
      description: 'good health',
      id: '4',
    },
  ],
};
