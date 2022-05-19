import { ComponentProps } from 'react';
import type { Story } from '@storybook/react';
import KeyValueItem from './KeyValueItem';
export default {
  title: 'PatientCard/KeyValueItem',
  component: KeyValueItem,
};
const Template: Story<ComponentProps<typeof KeyValueItem>> = (args) => (
  <KeyValueItem {...args} />
);
export const FirstStory = Template.bind({});
FirstStory.args = {
  primaryText: 'width',
  secondaryText: '1.75m',
};
