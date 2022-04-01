import React, { ComponentProps } from 'react';
import type { Story } from '@storybook/react';
import TitleButton from './TitleButton';
//👇 This default export determines where your story goes in the story list
export default {
  title: 'Buttons/TitleButton',
  component: TitleButton,
};
const Template: Story<ComponentProps<typeof TitleButton>> = (args) => (
  <TitleButton {...args} />
);
export const FirstStory = Template.bind({});
FirstStory.args = {
  title: 'In progress',
};
