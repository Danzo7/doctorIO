import { ComponentProps } from 'react';
import type { Story } from '@storybook/react';
import UploadFileModal from './UploadFileModal';
export default {
  title: 'Modals/UploadFileModal',
  component: UploadFileModal,
};
const Template: Story<ComponentProps<typeof UploadFileModal>> = (args) => (
  <UploadFileModal {...args} />
);
export const FirstStory = Template;
FirstStory.args = {};
