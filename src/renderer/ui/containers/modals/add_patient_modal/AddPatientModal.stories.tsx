import { ComponentProps } from 'react';
import type { Story } from '@storybook/react';
import AddPatientModal from './AddPatientModal';
export default {
  title: 'MODALS/AddPatientModal',
  component: AddPatientModal,
};
const Template: Story<ComponentProps<typeof AddPatientModal>> = (args) => (
  <AddPatientModal {...args} />
);
export const FirstStory = Template.bind({});
FirstStory.args = {};
