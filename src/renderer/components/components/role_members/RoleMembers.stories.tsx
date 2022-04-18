import React, { ComponentProps } from 'react';
import type { Story } from '@storybook/react';
import RoleMembers from './RoleMembers';
export default {
  title: 'RoleMembers',
  component: RoleMembers,
};
const Template: Story<ComponentProps<typeof RoleMembers>> = (args) => (
  <RoleMembers {...args} />
);
export const FirstStory = Template.bind({});
FirstStory.args = {
  roleName: 'Support',
  description:
    'hhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh brahim aymen hhhhhhhhhhhhhhhhhhhhhhhhhhhh daouadji aymen',
};
