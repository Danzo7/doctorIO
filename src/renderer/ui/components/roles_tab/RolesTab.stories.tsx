import { ComponentProps } from 'react';
import type { Story } from '@storybook/react';
import RolesTab from './RolesTab';
export default {
  title: 'RolesTab',
  component: RolesTab,
};
const Template: Story<ComponentProps<typeof RolesTab>> = (args) => (
  <RolesTab {...args} />
);
export const FirstStory = Template.bind({});
FirstStory.args = {
  roleList: [
    { roleName: 'Doctor' },
    { roleName: 'paramedic', linked: true },
    { roleName: 'Support', linked: true },
    { roleName: 'paramedic', linked: true },
    { roleName: 'Doctor' },
    { roleName: 'paramedic', linked: true },
    { roleName: 'Support', linked: true },
    { roleName: 'paramedic', linked: true },
    { roleName: 'Doctor' },
    { roleName: 'paramedic', linked: true },
    { roleName: 'Support', linked: true },
    { roleName: 'paramedic', linked: true },
  ],
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
