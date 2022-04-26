import React, { ComponentProps } from 'react';
import type { Story } from '@storybook/react';
import PermissionList from './PermissionList';
export default {
  title: 'RolesTab/PermissionList',
  component: PermissionList,
};
const Template: Story<ComponentProps<typeof PermissionList>> = (args) => (
  <PermissionList {...args} />
);
export const FirstStory = Template.bind({});
FirstStory.args = {
  height: 400,
  permissionArray: [
    {
      permissionName: 'administrator',
      permissionDescription:
        'Can access to database and edit clinic information',
      disabled: true,
    },
    {
      permissionName: 'Assistant',
      permissionDescription:
        '   people with this role will assist another role, mean they can only access to the dependent role permission',
      linkedPermission: ' @Rythm#3722',
    },
    {
      permissionName: 'Access to patients List',
      permissionDescription: 'This is an example permission',
    },
    {
      permissionName: 'Assistant',
      permissionDescription:
        '   people with this role will assist another role, mean they can only access to the dependent role permission',
      linkedPermission: ' @Rythm#3722',
    },
    {
      permissionName: 'Add patients',
      permissionDescription: '  This is an example permission',
    },
    {
      permissionName: 'Edit patients data',
      permissionDescription: ' This is an example permission',
    },
  ],
};
