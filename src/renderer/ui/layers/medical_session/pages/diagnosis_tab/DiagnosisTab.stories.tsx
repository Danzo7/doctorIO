import { ComponentProps } from 'react';
import type { Story } from '@storybook/react';
import DiagnosisTab from './DiagnosisTab';
export default {
  title: 'DiagnosisTab',
  component: DiagnosisTab,
};
const Template: Story<ComponentProps<typeof DiagnosisTab>> = (args) => (
  <DiagnosisTab />
);
export const FirstStory = Template;
FirstStory.args = {};
