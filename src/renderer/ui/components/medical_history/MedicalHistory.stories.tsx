import { ComponentProps } from 'react';
import type { Story } from '@storybook/react';
import MedicalHistory from './MedicalHistory';
export default {
  title: 'MedicalHistory',
  component: MedicalHistory,
};
const Template: Story<ComponentProps<typeof MedicalHistory>> = (args) => (
  <MedicalHistory {...args} />
);
export const FirstStory = Template;
FirstStory.args = {};
