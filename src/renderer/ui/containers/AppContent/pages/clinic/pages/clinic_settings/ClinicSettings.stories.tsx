import { ComponentProps } from 'react';
import type { Story } from '@storybook/react';
import ClinicSettings from './ClinicSettings';
export default {
  title: 'ClinicSettings',
  component: ClinicSettings,
};
const Template: Story<ComponentProps<typeof ClinicSettings>> = (args) => (
  <ClinicSettings {...args} />
);
export const FirstStory = Template;
FirstStory.args = {};
