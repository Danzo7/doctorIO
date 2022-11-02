import { ComponentProps } from 'react';
import type { Story } from '@storybook/react';
import ArrowButton from './ArrowButton';
export default {
  title: 'Buttons/ArrowButton',
  component: ArrowButton,
};
const Template: Story<ComponentProps<typeof ArrowButton>> = (args) => (
  <ArrowButton {...args} />
);
export const FirstStory = Template;
FirstStory.args = {};
