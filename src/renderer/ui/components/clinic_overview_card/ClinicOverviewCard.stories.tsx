import { ComponentProps } from 'react';
import type { Story } from '@storybook/react';
import ClinicOverviewCard from './ClinicOverviewCard';
export default {
  title: 'ClinicOverviewCard',
  component: ClinicOverviewCard,
};
const Template: Story<ComponentProps<typeof ClinicOverviewCard>> = (args) => (
  <ClinicOverviewCard {...args} />
);
export const FirstStory = Template;
FirstStory.args = {
  name: 'PAN',
  address: '192.168.1.1',
  serviceStatus: 'Good',
  connectionCount: 18,
  memberCount: 99,
  patientCount: 5,
};
