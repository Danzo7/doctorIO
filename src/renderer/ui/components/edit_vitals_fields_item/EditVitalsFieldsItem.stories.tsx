import { ComponentProps } from 'react';
import type { Story } from '@storybook/react';
import EditVitalsFieldsItem from './EditVitalsFieldsItem';
export default {
  title: 'EditVitalsFieldsItem',
  component: EditVitalsFieldsItem,
};
const Template: Story<ComponentProps<typeof EditVitalsFieldsItem>> = (args) => (
  <EditVitalsFieldsItem {...args} />
);
export const FirstStory = Template;
FirstStory.args = {};
