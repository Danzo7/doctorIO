import { ComponentProps } from 'react';
import type { Story } from '@storybook/react';
import AddKeywordField from './AddKeywordField';
export default {
  title: 'AddKeywordField',
  component: AddKeywordField,
};
const Template: Story<ComponentProps<typeof AddKeywordField>> = (args) => (
  <AddKeywordField {...args} />
);
export const FirstStory = Template;
FirstStory.args = {};
