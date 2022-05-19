import { ComponentProps } from 'react';
import type { Story } from '@storybook/react';
import PatientCard from './PatientCard';
import CurrentPatient from '@components/current_patient';
import MiniPatientCard from './mini_patient_card';
export default {
  title: 'PatientCard/PatientCard',
  component: PatientCard,
};
const Template: Story<ComponentProps<typeof PatientCard>> = (args) => (
  <PatientCard {...args} />
);
export const FirstStory = Template.bind({});
FirstStory.args = {
  data: {
    Height: '1.75 m',
    Weight: '107 kg',
    Pressure: '15',
    Blood: 'O +',
    ansolin: '15',
    whatever: '20',
  },
  LeftComp: (
    <MiniPatientCard
      patientFullName="John Doe"
      patientId="#123468"
      numPostAppointment={18}
      nextAppointmentDate="25 jan 2028"
    />
  ),
};
