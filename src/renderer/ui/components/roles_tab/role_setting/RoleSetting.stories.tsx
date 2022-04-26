import React, { ComponentProps } from 'react';
import type { Story } from '@storybook/react';
import RoleSetting from './RoleSetting';
export default {
  title: 'RolesTab/RoleSetting',
  component: RoleSetting,
};
const Template: Story<ComponentProps<typeof RoleSetting>> = (args) => (
  <RoleSetting {...args} />
);
export const FirstStory = Template.bind({});
FirstStory.args = {};
