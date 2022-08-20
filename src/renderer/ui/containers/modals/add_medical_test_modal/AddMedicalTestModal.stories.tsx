import { ComponentProps } from 'react';
import type { Story } from '@storybook/react';
import AddMedicalTestModal from './AddMedicalTestModal';
export default {
  title: 'AddMedicalTestModal',
  component: AddMedicalTestModal,
};
const Template: Story<ComponentProps<typeof AddMedicalTestModal>> = (args) => (
  <AddMedicalTestModal {...args} />
);
export const FirstStory = Template.bind({});
FirstStory.args = {};
