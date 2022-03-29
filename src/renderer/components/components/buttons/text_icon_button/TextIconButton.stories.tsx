import React, { ComponentProps } from 'react';
import type { Story } from '@storybook/react';
import TextIconButton from './TextIconButton';
//👇 This default export determines where your story goes in the story list
export default {
  title: 'Buttons/TextIconButton',
  component: TextIconButton,
};
const Template: Story<ComponentProps<typeof TextIconButton>> = (args) => (
  <TextIconButton {...args} />
);
export const primary = Template.bind({});
primary.args = {};
