import { ComponentProps } from 'react';
import type { Story } from '@storybook/react';
import TextToggleButton from './TextToggleButton';
//👇 This default export determines where your story goes in the story list
export default {
  title: 'Buttons/TextToggleButton',
  component: TextToggleButton,
};
const Template: Story<ComponentProps<typeof TextToggleButton>> = (args) => (
  <TextToggleButton {...args} />
);
export const FirstStory = Template;
FirstStory.args = {
  firstText: 'mony',
  secondText: 'fame',
  defaultSelect: 'first',
};
