import React, { ComponentProps } from 'react';
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
export const FirstStory = Template.bind({});
FirstStory.args = {
  imgSrc: client,
  messenger: 'Aymen',
  messageTime: 'Today at 12:18AM',
  messageContent: 'hello doctor therapist ',
};
