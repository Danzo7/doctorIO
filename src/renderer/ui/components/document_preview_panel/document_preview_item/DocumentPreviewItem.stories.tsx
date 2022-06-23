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
  fileId: 4,
  fileName: 'file1.pdf',
  fileType: 'pdf',
  date: new Date('2022-01-01'),
  filePath: '',
  fileSize: 3000,
};
