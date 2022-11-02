import { ComponentProps } from 'react';
import type { Story } from '@storybook/react';
import MiniPatientCard from './MiniPatientCard';
export default {
  title: 'PatientCard/MiniPatientCard',
  component: MiniPatientCard,
};
const Template: Story<ComponentProps<typeof MiniPatientCard>> = (args) => (
  <MiniPatientCard {...args} />
);
export const FirstStory = Template;
FirstStory.args = {
  patientFullName: 'John Brown',
  patientId: '#12345678',
  numPostAppointment: 16,
  nextAppointmentDate: new Date('2022-12-10'),
};
