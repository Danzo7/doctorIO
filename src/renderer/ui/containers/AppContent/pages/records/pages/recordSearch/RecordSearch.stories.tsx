import { ComponentProps } from 'react';
import type { Story } from '@storybook/react';
import RecordSearch from './RecordSearch';
export default {
  title: 'Records',
  component: RecordSearch,
};
const Template: Story<ComponentProps<typeof RecordSearch>> = (args) => (
  <RecordSearch {...args} />
);
export const FirstStory = Template;
FirstStory.args = {};
