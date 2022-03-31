import React, { ComponentProps } from 'react';
import type { Story } from '@storybook/react';
import MiniStats from './MiniStats';
import exclamation from 'toSvg/exclamation.svg';
//👇 This default export determines where your story goes in the story list
export default {
  title: 'MiniStats',
  component: MiniStats,
};
const Template: Story<ComponentProps<typeof MiniStats>> = (args) => (
  <MiniStats {...args} />
);
export const FirstStory = Template.bind({});
FirstStory.args = {
  value: 10,
  text: 'hello',
  Icon: exclamation,
  percentage: 50,
  state: '',
};
