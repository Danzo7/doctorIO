import React, { ComponentProps } from 'react';
import type { Story } from '@storybook/react';
import ButtonsHoverLock from './ButtonsHoverLock';
//👇 This default export determines where your story goes in the story list
export default {
  title: 'ButtonsHoverLock',
  component: ButtonsHoverLock,
};
const Template: Story<ComponentProps<typeof ButtonsHoverLock>> = () => (
  <ButtonsHoverLock />
);
export const FirstStory = Template.bind({});
FirstStory.args = {};
