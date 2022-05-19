import { ComponentProps } from 'react';
import type { Story } from '@storybook/react';
import DocumentPreviewItem from './DocumentPreviewItem';
export default {
  title: 'DocumentPreviewPanel/DocumentPreviewItem',
  component: DocumentPreviewItem,
};
const Template: Story<ComponentProps<typeof DocumentPreviewItem>> = (args) => (
  <DocumentPreviewItem {...args} />
);
export const FirstStory = Template.bind({});
FirstStory.args = {
  documentName: 'Scanner.pdf',
  publishDate: '28 Feb 2021',
  onPressHistory: () => {},
  onDelete: () => {},
};
