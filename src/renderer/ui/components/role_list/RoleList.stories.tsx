import React, { ComponentProps } from 'react';
import type { Story } from '@storybook/react';
import RoleList from './RoleList';
export default {
  title: 'RoleList',
  component: RoleList,
};
const Template: Story<ComponentProps<typeof RoleList>> = (args) => (
  <RoleList {...args} />
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
};
