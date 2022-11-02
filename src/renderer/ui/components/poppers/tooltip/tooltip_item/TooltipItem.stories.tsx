import { ComponentProps } from 'react';
import type { Story } from '@storybook/react';
import TooltipItem from './TooltipItem';
export default {
  title: 'Poppers/TooltipItem',
  component: TooltipItem,
};
const Template: Story<ComponentProps<typeof TooltipItem>> = (args) => (
  <TooltipItem {...args} />
);
export const FirstStory = Template;
FirstStory.args = {
  text: 'item1',
};
