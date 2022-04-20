import React, { ComponentProps } from 'react';
import type { Story } from '@storybook/react';
import BackButton from './BackButton';
//👇 This default export determines where your story goes in the story list
export default {
  title: 'Buttons/BackButton',
  component: BackButton,
};
const Template: Story<ComponentProps<typeof BackButton>> = (args) => (
  <BackButton {...args} />
);
export const FirstStory = Template.bind({});
FirstStory.args = {};
