// YourComponent.stories.tsx

import React, { ComponentProps } from 'react';

import type { Story } from '@storybook/react';

import  AppMenu  from './AppMenu';

//👇 This default export determines where your story goes in the story list
export default {
  title: 'AppMenu',
  component: AppMenu,
};

//👇 We create a “template” of how args map to rendering
const Template: Story<ComponentProps<typeof AppMenu>> = (args) => <AppMenu {...args} />;

export const FirstStory = Template.bind({});
FirstStory.args = {
  /*👇 The args you need here will depend on your component */
};