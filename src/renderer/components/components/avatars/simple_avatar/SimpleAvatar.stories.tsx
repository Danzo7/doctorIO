import React, { ComponentProps } from 'react';
import type { Story } from '@storybook/react';
import SimpleAvatar from './SimpleAvatar';
import profile from 'toSvg/profile.png';
//👇 This default export determines where your story goes in the story list
export default {
  title: 'Avatars/SimpleAvatar',
  component: SimpleAvatar,
};
const Template: Story<ComponentProps<typeof SimpleAvatar>> = (args) => (
  <SimpleAvatar {...args} />
);
export const FirstStory = Template.bind({});
FirstStory.args = {
  img_src: profile,
};
