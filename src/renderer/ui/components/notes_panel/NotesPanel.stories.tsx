import { ComponentProps } from 'react';
import type { Story } from '@storybook/react';
import NotesPanel from './NotesPanel';
export default {
  title: 'NotesPanel',
  component: NotesPanel,
};
const Template: Story<ComponentProps<typeof NotesPanel>> = (args) => (
  <NotesPanel {...args} />
);
export const FirstStory = Template;
FirstStory.args = { note: 'just note', date: new Date() };
