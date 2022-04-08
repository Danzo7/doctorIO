import React, { ComponentProps } from 'react';
    import type { Story } from '@storybook/react';
    import  DarkLightCornerButton  from './DarkLightCornerButton';
    //👇 This default export determines where your story goes in the story list
    export default {
      title: 'DarkLightCornerButton',
      component: DarkLightCornerButton,
    };
    const Template: Story<ComponentProps<typeof DarkLightCornerButton>> = (args) => <DarkLightCornerButton {...args} />;
    export const FirstStory = Template.bind({});
    FirstStory.args = {
    };