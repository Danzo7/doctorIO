import { ComponentProps } from 'react';
import type { Story } from '@storybook/react';
import ClinicItem from './ClinicItem';
import { template } from '@api/fake';
export default {
  title: 'ClinicItem',
  component: ClinicItem,
};
const Template: Story<ComponentProps<typeof ClinicItem>> = (args) => (
  <ClinicItem {...args} />
);
export const FirstStory = Template.bind({});
FirstStory.args = {
  clinicInfo: template.clinic[0],
};
