import { ComponentProps } from 'react';
import type { Story } from '@storybook/react';
import DraggableButton from './DraggableButton';
export default {
  title: 'DraggableButton',
  component: DraggableButton,
};
const Template: Story<ComponentProps<typeof DraggableButton>> = (args) => (
  <DraggableButton {...args} />
);
export const FirstStory = Template;
FirstStory.args = {};
