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
  bookedBy: 'strng',
  bookedIn: new Date(),
  treatedBy: 'strng',
  treatedIn: new Date(),
  subject: 'Dead',
};
