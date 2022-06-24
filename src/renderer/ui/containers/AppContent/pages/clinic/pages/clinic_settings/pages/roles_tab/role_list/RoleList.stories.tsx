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
FirstStory.args = {};
