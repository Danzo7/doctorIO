import React, { ComponentProps } from 'react';
import type { Story } from '@storybook/react';
import MiniStats from './MiniStats';

//👇 This default export determines where your story goes in the story list
export default {
  title: 'MiniStats',
  component: MiniStats,
  argTypes: {
    state: { type: 'select', options: [0, 1, 2] },
  },
};
const Template: Story<ComponentProps<typeof MiniStats>> = (args) => (
  <MiniStats {...args} />
);
export const FirstStory = Template.bind({});
FirstStory.args = { value: '10', text: '11' };
