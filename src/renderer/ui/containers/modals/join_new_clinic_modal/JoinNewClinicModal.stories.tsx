import { ComponentProps } from 'react';
import type { Story } from '@storybook/react';
import JoinNewClinicModal from './JoinNewClinicModal';
export default {
  title: 'MODALS/JoinNewClinicModal',
  component: JoinNewClinicModal,
};
const Template: Story<ComponentProps<typeof JoinNewClinicModal>> = (args) => (
  <JoinNewClinicModal {...args} />
);
export const FirstStory = Template;
FirstStory.args = {};
