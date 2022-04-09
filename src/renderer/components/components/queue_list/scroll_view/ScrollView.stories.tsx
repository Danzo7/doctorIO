import React, { ComponentProps } from 'react';
import type { Story } from '@storybook/react';
import { ScrollView } from './ScrollView';
//👇 This default export determines where your story goes in the story list
export default {
  title: 'ScrollView',
  component: ScrollView,
};
const Template: Story<ComponentProps<typeof ScrollView>> = (args) => (
  <ScrollView {...args}></ScrollView>
);
export const FirstStory = Template.bind({});
FirstStory.args = {};
