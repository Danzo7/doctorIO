import React, { ComponentProps } from 'react';
import type { Story } from '@storybook/react';
import SmallRolePreview from './SmallRolePreview';
//👇 This default export determines where your story goes in the story list
export default {
  title: 'SmallRolePreview',
  component: SmallRolePreview,
};
const Template: Story<ComponentProps<typeof SmallRolePreview>> = (args) => (
  <SmallRolePreview {...args} />
);
export const FirstStory = Template.bind({});
FirstStory.args = {
  roleName: 'Gamer',
};
