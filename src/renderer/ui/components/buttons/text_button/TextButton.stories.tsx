import React, { ComponentProps } from 'react';
import type { Story } from '@storybook/react';
import TextButton from './TextButton';
import colors from '@colors';
//👇 This default export determines where your story goes in the story list
export default {
  title: 'Buttons/TitleButton',
  component: TextButton,
};
const Template: Story<ComponentProps<typeof TextButton>> = (args) => (
  <TextButton {...args} />
);
export const FirstStory = Template.bind({});
FirstStory.args = {
  text: 'Members...',
  fontSize: 14,
  backgroundColor: colors.background,
  borderColor: colors.border_color,
  radius: 7,
};
