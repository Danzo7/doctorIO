import { ComponentProps } from 'react';
import type { Story } from '@storybook/react';
import RoleList from './RoleList';
export default {
  title: 'rolesTab/RoleList',
  component: RoleList,
};
const Template: Story<ComponentProps<typeof RoleList>> = (args) => (
  <RoleList {...args} />
);
export const FirstStory = Template.bind({});
FirstStory.args = {
  roleList: [
    { roleName: 'Doctor' },
    { roleName: 'paramedic', linked: '@doctor' },
    { roleName: 'Support', linked: '@doctor' },
    { roleName: 'paramedic', linked: '@doctor' },
    { roleName: 'Doctor' },
    { roleName: 'paramedic', linked: '@doctor' },
    { roleName: 'Support', linked: '@doctor' },
    { roleName: 'paramedic', linked: '@doctor' },
    { roleName: 'Doctor' },
    { roleName: 'paramedic', linked: '@doctor' },
    { roleName: 'Support', linked: '@doctor' },
    { roleName: 'paramedic', linked: '@doctor' },
  ],
};
