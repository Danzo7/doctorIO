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
  permissionName: 'Assistant',
  permissionDescription:
    '   people with this role will assist another role, mean they can only access to the dependent role permission',
  disabled: false,
  linkedPermission: ' @Rythm#3722',
};
