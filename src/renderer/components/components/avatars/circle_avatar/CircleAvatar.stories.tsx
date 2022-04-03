import React, { ComponentProps } from 'react';
import type { Story } from '@storybook/react';
import CircleAvatar from './CircleAvatar';
import profile from '@assets/pictures/test.png';
//👇 This default export determines where your story goes in the story list
export default {
  title: 'Avatars/CircleAvatar',
  component: CircleAvatar,
};
const Template: Story<ComponentProps<typeof CircleAvatar>> = (args) => (
  <CircleAvatar {...args} />
);
export const FirstStory = Template.bind({});
FirstStory.args = {
  src: profile,
  width: '100px',
};
