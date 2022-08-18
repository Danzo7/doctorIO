import { ComponentProps } from 'react';
import type { Story } from '@storybook/react';
import MedicalTestModal from './MedicalTestModal';
export default {
  title: 'Modals/MedicalTestModal',
  component: MedicalTestModal,
};
const Template: Story<ComponentProps<typeof MedicalTestModal>> = (args) => (
  <MedicalTestModal {...args} />
);
export const FirstStory = Template.bind({});
FirstStory.args = {
  inputArray: [
    { label: 'weight', type: 'number' },
    { label: 'Tall', type: 'number' },
    { label: 'Blood pressure', type: 'text' },
    { label: 'Input', type: 'number' },
    { label: 'Input', type: 'text' },
    { label: 'Input', type: 'text' },
  ],
};
