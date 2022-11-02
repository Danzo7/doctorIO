import { ComponentProps } from 'react';
import type { Story } from '@storybook/react';
import IconicButton from './IconicButton';
import Call_icon from 'toSvg/messages_small.svg?icon';
//👇 This default export determines where your story goes in the story list
export default {
  title: 'Buttons/IconicButton',
  component: IconicButton,
};
const Template: Story<ComponentProps<typeof IconicButton>> = (args) => (
  <IconicButton {...args} />
);
export const FirstStory = Template;
FirstStory.args = {
  Icon: Call_icon,
  width: 40,
  backgroundColor: 'red',
  iconType: 'fill',
};
