import { ComponentProps } from 'react';
import type { Story } from '@storybook/react';
import VitalItem from './VitalItem';
export default {
  title: 'VitalItem',
  component: VitalItem,
};
const Template: Story<ComponentProps<typeof VitalItem>> = (args) => (
  <VitalItem {...args} />
);
export const FirstStory = Template;
FirstStory.args = { name: 'Height', value: '85', unit: 'kg' };
