import { ComponentProps } from 'react';
import type { Story } from '@storybook/react';
import Slider from './Slider';
export default {
  title: 'Slider',
  component: Slider,
};
const Template: Story<ComponentProps<typeof Slider>> = (args) => (
  <Slider {...args} />
);
export const FirstStory = Template;
FirstStory.args = {};
