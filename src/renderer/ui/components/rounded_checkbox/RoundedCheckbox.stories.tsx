import { ComponentProps } from 'react';
import type { Story } from '@storybook/react';
import RoundedCheckbox from './RoundedCheckbox';
export default {
  title: 'RoundedCheckbox',
  component: RoundedCheckbox,
};
const Template: Story<ComponentProps<typeof RoundedCheckbox>> = (args) => (
  <RoundedCheckbox {...args} />
);
export const FirstStory = Template;
FirstStory.args = { label: 'Nighty (default)' };
