import { ComponentProps } from 'react';
import type { Story } from '@storybook/react';
import BookedAppointmentPanel from './BookedAppointmentPanel';
export default {
  title: 'BookedAppointmentPanel',
  component: BookedAppointmentPanel,
};
const Template: Story<ComponentProps<typeof BookedAppointmentPanel>> = (
  args,
) => <BookedAppointmentPanel {...args} />;
export const FirstStory = Template;
FirstStory.args = {
  list: [
    {
      bookTime: new Date('2022-05-01'),
      id: '1',
      memberId: '1',
      memberName: 'John Doe',
      patientId: '1',
      patientName: 'John cruze',
    },
    {
      bookTime: new Date('2022-05-01'),
      id: '2',
      memberId: '1',
      memberName: 'John Doe',
      patientId: '1',
      patientName: 'John cruze',
    },
    {
      bookTime: new Date('2022-05-01'),
      id: '3',
      memberId: '1',
      memberName: 'John Doe',
      patientId: '1',
      patientName: 'John cruze',
    },
  ],
};
