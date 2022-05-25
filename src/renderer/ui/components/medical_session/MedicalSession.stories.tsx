import { ComponentProps } from 'react';
import type { Story } from '@storybook/react';
import MedicalSession from './MedicalSession';
export default {
  title: 'MedicalSession',
  component: MedicalSession,
};
const Template: Story<ComponentProps<typeof MedicalSession>> = (args) => (
  <MedicalSession {...args} />
);
export const FirstStory = Template.bind({});
FirstStory.args = {};
