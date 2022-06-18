import { ComponentProps } from 'react';
import type { Story } from '@storybook/react';
import SmallRoleList from './SmallRoleList';
export default {
  title: 'RoleList',
  component: SmallRoleList,
};
const Template: Story<ComponentProps<typeof SmallRoleList>> = (args) => (
  <SmallRoleList {...args} />
);
export const FirstStory = Template.bind({});
FirstStory.args = {};
