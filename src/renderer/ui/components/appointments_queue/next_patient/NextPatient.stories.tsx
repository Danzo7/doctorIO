import { ComponentProps } from 'react';
import type { Story } from '@storybook/react';
import NextPatient from './NextPatient';
export default {
  title: 'AppointmentsQueue/NextPatient',
  component: NextPatient,
};
const Template: Story<ComponentProps<typeof NextPatient>> = (args) => (
  <NextPatient {...args} />
);
export const FirstStory = Template.bind({});
FirstStory.args = {
  patientName: 'John doe',
  patientNumber: 5,
  appointmentDuration: '6min ago',
};
