import { ComponentProps } from 'react';
import type { Story } from '@storybook/react';
import CopySecretKeyModal from './CopySecretKeyModal';
export default {
  title: 'CopySecretKeyModal',
  component: CopySecretKeyModal,
};
const Template: Story<ComponentProps<typeof CopySecretKeyModal>> = (args) => (
  <CopySecretKeyModal {...args} />
);
export const FirstStory = Template
FirstStory.args = {};
