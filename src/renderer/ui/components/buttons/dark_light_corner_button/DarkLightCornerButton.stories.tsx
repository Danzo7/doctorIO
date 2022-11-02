import { ComponentProps } from 'react';
import type { Story } from '@storybook/react';
import DarkLightCornerButton from './DarkLightCornerButton';
//👇 This default export determines where your story goes in the story list
export default {
  title: 'Buttons/DarkLightCornerButton',
  component: DarkLightCornerButton,
};
const Template: Story<ComponentProps<typeof DarkLightCornerButton>> = (
  args,
) => <DarkLightCornerButton {...args} />;
export const FirstStory = Template;
FirstStory.args = {
  text: 'text',
};
