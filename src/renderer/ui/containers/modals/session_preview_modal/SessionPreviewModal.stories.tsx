import { ComponentProps } from 'react';
import type { Story } from '@storybook/react';
import SessionPreviewModal from './SessionPreviewModal';
export default {
  title: 'Modals/SessionPreviewModal',
  component: SessionPreviewModal,
};
const Template: Story<ComponentProps<typeof SessionPreviewModal>> = (args) => (
  <SessionPreviewModal {...args} />
);
export const FirstStory = Template.bind({});
FirstStory.args = {};
