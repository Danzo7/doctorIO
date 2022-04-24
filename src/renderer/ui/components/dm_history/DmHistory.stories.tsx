import React, { ComponentProps } from 'react';
import type { Story } from '@storybook/react';
import DmHistory from './DmHistory';
import client from '@assets/pictures/test.png';
export default {
  title: 'DmHistory',
  component: DmHistory,
};
const Template: Story<ComponentProps<typeof DmHistory>> = (args) => (
  <DmHistory {...args} />
);
export const FirstStory = Template.bind({});
FirstStory.args = {
  lastDmMessage: [
    {
      imgSrc: client,
      status: true,
      lastMessage: 'hello there!',
    },
    {
      imgSrc: client,
      status: true,
      lastMessage: 'hello there!',
    },
    {
      imgSrc: client,
      status: true,
      lastMessage: 'hello there!',
    },
    {
      imgSrc: client,
      status: true,
      lastMessage: 'hello there!',
    },
    {
      imgSrc: client,
      status: true,
      lastMessage: 'hello there!',
    },
    {
      imgSrc: client,
      status: true,
      lastMessage: 'hello there!',
    },
    {
      imgSrc: client,
      status: true,
      lastMessage: 'hello there!',
    },
    {
      imgSrc: client,
      status: true,
      lastMessage: 'hello there!',
    },
  ],
};
