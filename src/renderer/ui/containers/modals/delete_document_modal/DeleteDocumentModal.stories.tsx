import { ComponentProps } from 'react';
import type { Story } from '@storybook/react';
import DeleteDocumentModal from './DeleteDocumentModal';
export default {
  title: 'DeleteDocumentModal',
  component: DeleteDocumentModal,
};
const Template: Story<ComponentProps<typeof DeleteDocumentModal>> = (args) => (
  <DeleteDocumentModal {...args} />
);
export const FirstStory = Template;
FirstStory.args = {};
