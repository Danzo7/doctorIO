import { ComponentProps } from 'react';
import type { Story } from '@storybook/react';
import NoteItem from './NoteItem';
export default {
  title: 'NoteItem',
  component: NoteItem,
};
const Template: Story<ComponentProps<typeof NoteItem>> = (args) => (
  <NoteItem {...args} />
);
export const FirstStory = Template;
FirstStory.args = { date: new Date() };
