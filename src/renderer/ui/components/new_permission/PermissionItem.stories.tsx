import React, { ComponentProps } from 'react';
import type { Story } from '@storybook/react';
import PermissionItem from './PermissionItem';
export default {
  title: 'PermissionItem',
  component: PermissionItem,
};
const Template: Story<ComponentProps<typeof PermissionItem>> = (args) => (
  <PermissionItem {...args} />
);
export const FirstStory = Template.bind({});
FirstStory.args = {
  linked: true,
  disabled: false,
};
