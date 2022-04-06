import React, { ComponentProps } from 'react';
import type { Story } from '@storybook/react';
import AddButton from './AddButton';
//👇 This default export determines where your story goes in the story list
export default {
  title: 'AddButton',
  component: AddButton,
};
const Template: Story<ComponentProps<typeof AddButton>> = (args) => (
  <AddButton {...args} />
);
export const FirstStory = Template.bind({});
FirstStory.args = {};
