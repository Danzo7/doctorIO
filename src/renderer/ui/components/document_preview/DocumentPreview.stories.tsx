import { ComponentProps } from 'react';
import type { Story } from '@storybook/react';
import DocumentPreview from './DocumentPreview';
export default {
  title: 'DocumentPreview',
  component: DocumentPreview,
};
const Template: Story<ComponentProps<typeof DocumentPreview>> = (args) => (
  <DocumentPreview {...args} />
);
export const FirstStory = Template.bind({});
FirstStory.args = {
  documentName: 'Scanner.pdf',
  publishDate: '28 Feb 2021',
  onPressHistory: () => {},
  onDelete: () => {},
};
