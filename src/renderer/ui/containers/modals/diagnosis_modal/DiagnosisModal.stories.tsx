import { ComponentProps } from 'react';
import type { Story } from '@storybook/react';
import DiagnosisModal from './DiagnosisModal';
export default {
  title: 'Modals/DiagnosisModal',
  component: DiagnosisModal,
};
const Template: Story<ComponentProps<typeof DiagnosisModal>> = (args) => (
  <DiagnosisModal {...args} />
);
export const FirstStory = Template.bind({});
FirstStory.args = {
  inputArray: [
    { label: 'weight', type: 'number' },
    { label: 'Tall', type: 'number' },
    { label: 'Blood pressure', type: 'text' },
    { label: 'Input1', type: 'number' },
    { label: 'Input2', type: 'text' },
    { label: 'Input3', type: 'text' },
  ],
};
