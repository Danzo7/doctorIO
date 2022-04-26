import React, { ComponentProps } from 'react';
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
FirstStory.args = {};
