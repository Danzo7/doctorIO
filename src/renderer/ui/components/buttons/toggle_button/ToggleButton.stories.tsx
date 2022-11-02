import { ComponentProps } from 'react';
import type { Story } from '@storybook/react';
import ToggleButton from './ToggleButton';
//👇 This default export determines where your story goes in the story list
export default {
  title: 'Buttons/ToggleButton',
  component: ToggleButton,
};
const Template: Story<ComponentProps<typeof ToggleButton>> = (args) => (
  <ToggleButton {...args} />
);
export const FirstStory = Template;
FirstStory.args = {
  disabled: false,
  isChecked: true,
};
