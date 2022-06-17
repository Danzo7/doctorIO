import { ComponentProps } from 'react';
import type { Story } from '@storybook/react';
import DiagnosisPreview from './DiagnosisPreview';
export default {
  title: 'Modals/DiagnosisPreview',
  component: DiagnosisPreview,
};
const Template: Story<ComponentProps<typeof DiagnosisPreview>> = (args) => (
  <DiagnosisPreview {...args} />
);
export const FirstStory = Template.bind({});
FirstStory.args = {
  data: [
    { firstText: 'something', secondText: '11' },
    { firstText: 'something', secondText: '11' },
    { firstText: 'something', secondText: '11' },
    { firstText: 'something', secondText: '11' },
    { firstText: 'something', secondText: '11' },
    { firstText: 'something', secondText: '11' },
  ],
};
