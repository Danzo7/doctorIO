import { ComponentProps } from 'react';
import type { Story } from '@storybook/react';
import MiniStats from './MiniStats';
import exclamation from 'toSvg/exclamation.svg?icon';
//👇 This default export determines where your story goes in the story list
export default {
  title: 'MiniStats',
  component: MiniStats,
};
const Template: Story<ComponentProps<typeof MiniStats>> = (args) => (
  <MiniStats {...args} />
);
export const FirstStory = Template;
FirstStory.args = {
  value: 10,
  text: 'hello',
  Icon: exclamation,
  percentage: 0,
  state: '',
};
