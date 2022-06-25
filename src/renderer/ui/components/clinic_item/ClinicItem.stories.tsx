import { ComponentProps } from 'react';
import type { Story } from '@storybook/react';
import ClinicItem from './ClinicItem';
import { generateTime } from '@containers/AppContent/pages/clinic/pages/clinics/Clinics';
import profile from '@assets/pictures/test.png';
import { firstUser } from '@api/fake';
export default {
  title: 'ClinicItem',
  component: ClinicItem,
};
const Template: Story<ComponentProps<typeof ClinicItem>> = (args) => (
  <ClinicItem {...args} />
);
export const FirstStory = Template.bind({});
FirstStory.args = {
  clinicInfo: firstUser.clinic[0],
};
