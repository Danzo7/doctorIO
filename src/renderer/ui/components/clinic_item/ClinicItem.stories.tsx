import { ComponentProps } from 'react';
import type { Story } from '@storybook/react';
import ClinicItem from './ClinicItem';
import { generateTime } from '@containers/AppContent/pages/clinic/pages/clinics/Clinics';
import profile from '@assets/pictures/test.png';
export default {
  title: 'ClinicItem',
  component: ClinicItem,
};
const Template: Story<ComponentProps<typeof ClinicItem>> = (args) => (
  <ClinicItem {...args} />
);
export const FirstStory = Template.bind({});
FirstStory.args = {
  clinicInfo: {
    clinicName: 'PAN',
    clinicId: 0,
    clinicAddress: 'Blida',
    connectionCount: 20,
    serviceStatus: 'Good',
    patientCount: 18,
    memberCount: 20,
    timeToClose: generateTime(12, 0),
    avatar: profile,
  },
};
