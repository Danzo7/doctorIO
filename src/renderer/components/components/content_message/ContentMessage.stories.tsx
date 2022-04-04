import React, { ComponentProps } from 'react';
import type { Story } from '@storybook/react';
import ContentMessage from './ContentMessage';
import client from '@assets/pictures/test.png';
//👇 This default export determines where your story goes in the story list
export default {
  title: 'ContentMessage',
  component: ContentMessage,
};
const Template: Story<ComponentProps<typeof ContentMessage>> = (args) => (
  <ContentMessage {...args} />
);
export const FirstStory = Template.bind({});
FirstStory.args = {
  img_src: client,
  messenger: 'Aymen',
  message_time: 'Today at 12:18AM',
  message_content: 'hello doctor therapist ',
};
