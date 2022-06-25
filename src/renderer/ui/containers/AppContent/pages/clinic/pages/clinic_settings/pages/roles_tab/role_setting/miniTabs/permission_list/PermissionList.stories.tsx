import { ComponentProps } from 'react';
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
FirstStory.args = {};
