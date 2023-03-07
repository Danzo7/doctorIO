import { ComponentProps } from 'react';
import type { Story } from '@storybook/react';
import PdfViewerModal from './PdfViewerModal';
export default {
  title: 'PdfViewerModal',
  component: PdfViewerModal,
};
const Template: Story<ComponentProps<typeof PdfViewerModal>> = (args) => (
  <PdfViewerModal {...args} />
);
export const FirstStory = Template
FirstStory.args = {};
