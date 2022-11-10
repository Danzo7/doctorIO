import { ComponentProps } from 'react';
import type { Story } from '@storybook/react';
import LoadingModal from './LoadingModal';
export default {
  title: 'Modals/LoadingModal',
  component: LoadingModal,
};
const Template: Story<ComponentProps<typeof LoadingModal>> = (args) => (
  <LoadingModal {...args} />
);
export const FirstStory = Template;
FirstStory.args = {
  title: 'Reconnicting...',
  description: 'Trying to reconnect back to the server',
};
