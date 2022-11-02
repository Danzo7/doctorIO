import { ComponentProps } from 'react';
import type { Story } from '@storybook/react';
import ConnectMemberModal from './ConnectMemberModal';
export default {
  title: 'ConnectMemberModal',
  component: ConnectMemberModal,
};
const Template: Story<ComponentProps<typeof ConnectMemberModal>> = (args) => (
  <ConnectMemberModal {...args} />
);
export const FirstStory = Template;
FirstStory.args = {};
