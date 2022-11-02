import { ComponentProps } from 'react';
import type { Story } from '@storybook/react';
import TextButton from './TextButton';
import colors from '@colors';
//👇 This default export determines where your story goes in the story list
export default {
  title: 'Buttons/TextButton',
  component: TextButton,
};
const Template: Story<ComponentProps<typeof TextButton>> = (args) => (
  <TextButton {...args} />
);
export const FirstStory = Template;
FirstStory.args = {
  text: 'Members...',
  fontSize: 14,
  afterBgColor: colors.darkersec_color,
  afterBorderColor: colors.border_color,
  radius: 7,
};
