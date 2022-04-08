import React, { ComponentProps } from 'react';
import type { Story } from '@storybook/react';
import MembersPanel from './MembersPanel';
//👇 This default export determines where your story goes in the story list
export default {
  title: 'MembersPanel',
  component: MembersPanel,
};
const Template: Story<ComponentProps<typeof MembersPanel>> = (args) => (
  <MembersPanel {...args} />
);
export const FirstStory = Template.bind({});
FirstStory.args = {};
