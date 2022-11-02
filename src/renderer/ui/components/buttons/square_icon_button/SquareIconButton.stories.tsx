import { ComponentProps } from 'react';
import type { Story } from '@storybook/react';
import SquareIconButton from './SquareIconButton';
//👇 This default export determines where your story goes in the story list
export default {
  title: 'Buttons/SquareIconButton``',
  component: SquareIconButton,
};
const Template: Story<ComponentProps<typeof SquareIconButton>> = (args) => (
  <SquareIconButton {...args} />
);
export const FirstStory = Template;
FirstStory.args = {};
