import { ComponentProps } from 'react';
import type { Story } from '@storybook/react';
import SessionPreviewItem from './SessionPreviewItem';
export default {
  title: 'SessionPreviewItem',
  component: SessionPreviewItem,
};
const Template: Story<ComponentProps<typeof SessionPreviewItem>> = (args) => (
  <SessionPreviewItem {...args} />
);
export const FirstStory = Template;
FirstStory.args = {
  BookedBy: 'Aymen Daouadji',
  TreatedBy: 'Aymen Daouadji',
  BookedIn: new Date(),
  TreatedIn: new Date(),
  Subject: 'Dead',
};
