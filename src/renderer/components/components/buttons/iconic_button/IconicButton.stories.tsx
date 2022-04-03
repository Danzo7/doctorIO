import React, { ComponentProps } from 'react';
import type { Story } from '@storybook/react';
import IconicButton from './IconicButton';
import Call_icon from 'toSvg/messagesSmall.svg';
//👇 This default export determines where your story goes in the story list
export default {
  title: 'Buttons/IconicButton',
  component: IconicButton,
};
const Template: Story<ComponentProps<typeof IconicButton>> = (args) => (
  <IconicButton {...args} />
);
export const FirstStory = Template.bind({});
FirstStory.args = {
  Icon: Call_icon,
  width: 40,
  backgroundColor: 'red',
};
