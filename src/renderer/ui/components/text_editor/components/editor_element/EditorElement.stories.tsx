import { ComponentProps } from 'react';
import type { Story } from '@storybook/react';
import EditorElement from './EditorElement';
export default {
  title: 'EditorElement',
  component: EditorElement,
};
const Template: Story<ComponentProps<typeof EditorElement>> = (args) => (
  <EditorElement {...args} />
);
export const FirstStory = Template
FirstStory.args = {};
