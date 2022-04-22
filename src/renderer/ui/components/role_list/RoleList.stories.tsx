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
    { roleName: 'Doctor', selected: false },
    { roleName: 'paramedic', selected: true, linked: true },
    { roleName: 'Support', selected: false, linked: true },
    { roleName: 'paramedic', selected: false, linked: true },
    { roleName: 'Doctor', selected: false },
    { roleName: 'paramedic', selected: true, linked: true },
    { roleName: 'Support', selected: false, linked: true },
    { roleName: 'paramedic', selected: false, linked: true },
    { roleName: 'Doctor', selected: false },
    { roleName: 'paramedic', selected: true, linked: true },
    { roleName: 'Support', selected: false, linked: true },
    { roleName: 'paramedic', selected: false, linked: true },
  ],
};
