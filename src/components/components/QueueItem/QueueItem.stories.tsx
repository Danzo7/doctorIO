// YourComponent.stories.tsx

import React, { ComponentProps } from 'react';

import type { Story } from '@storybook/react';

import  QueueItem  from './QueueItem';

//👇 This default export determines where your story goes in the story list
export default {
  title: 'QueueItem',
  component: QueueItem,
};

//👇 We create a “template” of how args map to rendering
const Template: Story<ComponentProps<typeof QueueItem>> = (args) => <QueueItem {...args} />;

export const FirstStory = Template.bind({});
FirstStory.args = {
  /*👇 The args you need here will depend on your component */
};