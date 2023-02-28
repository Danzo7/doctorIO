import { ComponentProps } from 'react';
import type { Story } from '@storybook/react';
import Shimmer from './Shimmer';
export default {
  title: 'Shimmer',
  component: Shimmer,
};
const Template: Story<ComponentProps<typeof Shimmer>> = (args) => (
  <Shimmer {...args} />
);
export const FirstStory = Template;
FirstStory.args = {};
