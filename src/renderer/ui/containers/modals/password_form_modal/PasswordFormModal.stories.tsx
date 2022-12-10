import { ComponentProps } from 'react';
import type { Story } from '@storybook/react';
import PasswordFormModal from './PasswordFormModal';
export default {
  title: 'MODALS/PasswordFormModal',
  component: PasswordFormModal,
};
const Template: Story<ComponentProps<typeof PasswordFormModal>> = (args) => (
  <PasswordFormModal {...args} />
);
export const FirstStory = Template;
FirstStory.args = {};
