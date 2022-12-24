import { ComponentProps } from 'react';
import type { Story } from '@storybook/react';
import VitalFieldItem from './VitalFieldItem';
export default {
  title: 'VitalFieldItem',
  component: VitalFieldItem,
};
const Template: Story<ComponentProps<typeof VitalFieldItem>> = (args) => (
  <VitalFieldItem {...args} />
);
export const FirstStory = Template;
FirstStory.args = {};
