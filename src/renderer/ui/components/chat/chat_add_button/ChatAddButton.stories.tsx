import React, { ComponentProps } from 'react';
import type { Story } from '@storybook/react';
import ChatAddButton from './ChatAddButton';
export default {
  title: 'Chat/ChatAddButton',
  component: ChatAddButton,
};
const Template: Story<ComponentProps<typeof ChatAddButton>> = (args) => (
  <ChatAddButton {...args} />
);
export const FirstStory = Template.bind({});
FirstStory.args = {};
