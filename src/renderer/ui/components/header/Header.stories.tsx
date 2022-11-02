import { ComponentProps } from 'react';
import type { Story } from '@storybook/react';
import Header from './Header';
import DarkLightCornerButton from '@components/buttons/dark_light_corner_button';
export default {
  title: 'Header',
  component: Header,
};
const Template: Story<ComponentProps<typeof Header>> = (args) => (
  <Header {...args} />
);
export const FirstStory = Template;
FirstStory.args = {
  title: 'Header Title',
  buttonNode: <DarkLightCornerButton text="Click" />,
};
