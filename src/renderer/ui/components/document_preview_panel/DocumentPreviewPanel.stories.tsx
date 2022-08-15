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
FirstStory.args = {};
