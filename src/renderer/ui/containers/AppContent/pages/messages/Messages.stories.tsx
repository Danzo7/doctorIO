import { ComponentProps } from 'react';
import type { Story } from '@storybook/react';
import Messages from './Messages';
export default {
  title: 'contents/Messages',
  component: Messages,
};
const Template: Story<ComponentProps<typeof Messages>> = (args) => (
  <Messages {...args} />
);
export const FirstStory = Template;
FirstStory.args = {};
