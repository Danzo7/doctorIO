import { ComponentProps } from 'react';
import type { Story } from '@storybook/react';
import PrescriptionTab from './PrescriptionTab';
export default {
  title: 'PrescriptionTab',
  component: PrescriptionTab,
};
const Template: Story<ComponentProps<typeof PrescriptionTab>> = (args) => (
  <PrescriptionTab {...args} />
);
export const FirstStory = Template.bind({});
FirstStory.args = {};
