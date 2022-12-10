import { ComponentProps } from 'react';
import type { Story } from '@storybook/react';
import ChangeSecretModal from './ChangeSecretModal';
export default {
  title: 'MODALS/ChangeSecretModal',
  component: ChangeSecretModal,
};
const Template: Story<ComponentProps<typeof ChangeSecretModal>> = (args) => (
  <ChangeSecretModal {...args} />
);
export const FirstStory = Template;
FirstStory.args = {};
