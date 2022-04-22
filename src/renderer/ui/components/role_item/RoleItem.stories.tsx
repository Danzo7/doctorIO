import React, { ComponentProps } from 'react';
import type { Story } from '@storybook/react';
import RoleItem from './RoleItem';
//👇 This default export determines where your story goes in the story list
export default {
  title: 'RoleItem',
  component: RoleItem,
};
const Template: Story<ComponentProps<typeof RoleItem>> = (args) => (
  <RoleItem {...args} />
);
export const FirstStory = Template.bind({});
FirstStory.args = {
  linked: true,
  selected: true,
};
