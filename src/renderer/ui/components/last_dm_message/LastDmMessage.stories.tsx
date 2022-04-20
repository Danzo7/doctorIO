import React, { ComponentProps } from 'react';
import type { Story } from '@storybook/react';
import LastDmMessage from './LastDmMessage';
import client from '@assets/pictures/test.png';
export default {
  title: 'LastDmMessage',
  component: LastDmMessage,
};
const Template: Story<ComponentProps<typeof LastDmMessage>> = (args) => (
  <LastDmMessage {...args} />
);
export const FirstStory = Template.bind({});
FirstStory.args = {
  imgSrc: client,
  status: true,
  lastMessage: 'hello there!',
};
