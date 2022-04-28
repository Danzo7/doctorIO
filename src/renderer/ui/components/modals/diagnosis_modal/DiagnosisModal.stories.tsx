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
  inputArray: ['weight', 'Tall', 'Blood pressure', 'Input', 'Input', 'Input'],
};
