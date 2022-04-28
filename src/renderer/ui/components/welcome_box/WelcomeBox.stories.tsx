import { ComponentProps } from 'react';
import type { Story } from '@storybook/react';
import WelcomeBox from './WelcomeBox';
//👇 This default export determines where your story goes in the story list
export default {
  title: 'WelcomeBox',
  component: WelcomeBox,
};
const Template: Story<ComponentProps<typeof WelcomeBox>> = (args) => (
  <WelcomeBox {...args} />
);
export const FirstStory = Template.bind({});
FirstStory.args = {};
