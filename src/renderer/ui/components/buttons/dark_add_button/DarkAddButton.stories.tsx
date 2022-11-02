import { ComponentProps } from 'react';
import type { Story } from '@storybook/react';
import DarkAddButton from './DarkAddButton';
export default {
  title: 'buttons/DarkAddButton',
  component: DarkAddButton,
};
const Template: Story<ComponentProps<typeof DarkAddButton>> = (args) => (
  <DarkAddButton {...args} />
);
export const FirstStory = Template;
FirstStory.args = {};
