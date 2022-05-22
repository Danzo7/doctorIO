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
export const FirstStory = Template.bind({});
FirstStory.args = {
  clinicName: 'KillLersSSs',
  clinicAddress: '192.168.1.1',
  numOfCurrentConnections: 13,
  serviceStatus: 'BAD',
  numOfMembers: 18,
  numOfPatients: 14,
};
