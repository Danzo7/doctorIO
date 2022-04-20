import React, { ComponentProps } from 'react';
import type { Story } from '@storybook/react';
import MemberFooter from './MemberFooter';
//👇 This default export determines where your story goes in the story list
export default {
  title: 'MemberFooter',
  component: MemberFooter,
};
const Template: Story<ComponentProps<typeof MemberFooter>> = (args) => (
  <MemberFooter {...args} />
);
export const FirstStory = Template.bind({});
FirstStory.args = {
  memberID: '100',
  status: 'Online',
};
