import { ComponentProps } from 'react';
import type { Story } from '@storybook/react';
import EditNoteModal from './EditNoteModal';
export default {
  title: 'MODALS/EditNoteModal',
  component: EditNoteModal,
};
const Template: Story<ComponentProps<typeof EditNoteModal>> = (args) => (
  <EditNoteModal {...args} />
);
export const FirstStory = Template;
FirstStory.args = {};
