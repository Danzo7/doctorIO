import { ComponentProps } from 'react';
import type { Story } from '@storybook/react';
import PrintSelectionModal from './PrintSelectionModal';
export default {
  title: 'MODALS/PrintSelectionModal',
  component: PrintSelectionModal,
};
const Template: Story<ComponentProps<typeof PrintSelectionModal>> = (args) => (
  <PrintSelectionModal {...args} />
);
export const FirstStory = Template;
FirstStory.args = {};
