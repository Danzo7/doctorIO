import { ComponentProps } from 'react';
import type { Story } from '@storybook/react';
import ContentMessage from './ContentMessage';
import client from '@assets/pictures/test.png';
//👇 This default export determines where your story goes in the story list
export default {
  title: 'Chat/ContentMessage',
  component: ContentMessage,
};
const Template: Story<ComponentProps<typeof ContentMessage>> = (args) => (
  <ContentMessage {...args} />
);
export const FirstStory = Template;
FirstStory.args = {
  memberId: 1,
  id: 1,
  name: 'Test',
  avatar: client,
  message: {
    date: new Date(),
    text: 'Hello',
    seen: false,
  },
};
