import React, { ComponentProps } from 'react';
import type { Story } from '@storybook/react';
import ToggleselectedItem from './ToggleselectedItem';
//👇 This default export determines where your story goes in the story list
export default {
  title: 'ToggleselectedItem',
  component: ToggleselectedItem,
  argTypes: {
    separator_direction: { type: 'select', options: ['left', 'right'] },
  },
};
const Template: Story<ComponentProps<typeof ToggleselectedItem>> = (args) => (
  <ToggleselectedItem {...args} />
);
export const FirstStory = Template.bind({});
FirstStory.args = {
  text: 'Selected',
  separator_direction: 'left',
};
