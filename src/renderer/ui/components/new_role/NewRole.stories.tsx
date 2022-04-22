import React, { ComponentProps } from 'react';
import type { Story } from '@storybook/react';
import NewRole from './NewRole';
export default {
  title: 'NewRole',
  component: NewRole,
};
const Template: Story<ComponentProps<typeof NewRole>> = (args) => (
  <NewRole {...args} />
);
export const FirstStory = Template.bind({});
FirstStory.args = {};
