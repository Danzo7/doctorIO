import { ComponentProps } from 'react';
import type { Story } from '@storybook/react';
import DocumentPreviewPanel from './DocumentPreviewPanel';
export default {
  title: 'DocumentPreviewPanel/DocumentPreviewPanel',
  component: DocumentPreviewPanel,
};
const Template: Story<ComponentProps<typeof DocumentPreviewPanel>> = (args) => (
  <DocumentPreviewPanel {...args} />
);
export const FirstStory = Template.bind({});
FirstStory.args = {
  list: [
    {
      fileId: 1,
      fileName: 'file1.pdf',
      fileType: 'pdf',
      date: new Date('2022-01-01'),
      filePath: '',
      fileSize: 3000,
    },
    {
      fileId: 2,
      fileName: 'file1.pdf',
      fileType: 'pdf',
      date: new Date('2022-01-01'),
      filePath: '',
      fileSize: 3000,
    },
    {
      fileId: 3,
      fileName: 'file1.pdf',
      fileType: 'pdf',
      date: new Date('2022-01-01'),
      filePath: '',
      fileSize: 3000,
    },
  ],
};
