import { ComponentProps } from 'react';
import type { Story } from '@storybook/react';
import ProfilePictureModal from './ProfilePictureModal';
export default {
  title: 'MODALS/ProfilePictureModal',
  component: ProfilePictureModal,
};
const Template: Story<ComponentProps<typeof ProfilePictureModal>> = (args) => (
  <ProfilePictureModal {...args} />
);
export const FirstStory = Template;
FirstStory.args = {};
