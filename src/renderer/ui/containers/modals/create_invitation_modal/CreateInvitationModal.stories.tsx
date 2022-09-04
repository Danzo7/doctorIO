import { ComponentProps } from 'react';
import type { Story } from '@storybook/react';
import CreateInvitationModal from './CreateInvitationModal';
export default {
  title: 'MODALS/CreateInvitationModal',
  component: CreateInvitationModal,
};
const Template: Story<ComponentProps<typeof CreateInvitationModal>> = (
  args,
) => <CreateInvitationModal {...args} />;
export const FirstStory = Template.bind({});
FirstStory.args = {};
