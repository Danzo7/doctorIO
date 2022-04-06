import React, { ComponentProps } from 'react';
import type { Story } from '@storybook/react';
import SmallRoll from './SmallRoll';
//👇 This default export determines where your story goes in the story list
export default {
  title: 'SmallRoll',
  component: SmallRoll,
};
const Template: Story<ComponentProps<typeof SmallRoll>> = (args) => (
  <SmallRoll {...args} />
);
export const FirstStory = Template.bind({});
FirstStory.args = {
  rollName: 'Gamer',
};
