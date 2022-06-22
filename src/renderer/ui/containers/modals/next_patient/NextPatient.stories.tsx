import { ComponentProps } from 'react';
import type { Story } from '@storybook/react';
import NextPatient from './NextPatient';
import { subDays } from 'date-fns';
export default {
  title: 'Modals/NextPatient',
  component: NextPatient,
};
const Template: Story<ComponentProps<typeof NextPatient>> = (args) => (
  <NextPatient {...args} />
);
export const FirstStory = Template.bind({});
FirstStory.args = {
  patientName: 'John doe',
  position: 5,
  arrivalTime: subDays(new Date(), 3),
};
