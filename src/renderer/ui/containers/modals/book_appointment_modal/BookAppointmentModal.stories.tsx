import { ComponentProps } from 'react';
import type { Story } from '@storybook/react';
import BookAppointmentModal from './BookAppointmentModal';
export default {
  title: 'Modals/BookAppointmentModal',
  component: BookAppointmentModal,
};
const Template: Story<ComponentProps<typeof BookAppointmentModal>> = (args) => (
  <BookAppointmentModal {...args} />
);
export const FirstStory = Template.bind({});
FirstStory.args = {
  patientName: 'John Doe',
  id: '123456789',
};
