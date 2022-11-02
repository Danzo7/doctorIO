import { ComponentProps } from 'react';
import type { Story } from '@storybook/react';
import ChatAddButton from './ChatAddButton';
export default {
  title: 'buttons/ChatAddButton',
  component: ChatAddButton,
};
const Template: Story<ComponentProps<typeof ChatAddButton>> = (args) => (
  <ChatAddButton {...args} />
);
export const FirstStory = Template;
FirstStory.args = {};
