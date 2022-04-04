import React, { ComponentProps } from 'react';
import type { Story } from '@storybook/react';
import UserProfileStatus from './UserProfileStatus';
import profile from '@assets/pictures/test.png';
//👇 This default export determines where your story goes in the story list
export default {
  title: 'UserProfileStatus',
  component: UserProfileStatus,
};
const Template: Story<ComponentProps<typeof UserProfileStatus>> = (args) => (
  <UserProfileStatus {...args} />
);
export const FirstStory = Template.bind({});
FirstStory.args = {
  img_src: profile,
};
