import { ComponentProps } from 'react';
import type { Story } from '@storybook/react';
import KeywordFieldItem from './KeywordFieldItem';
export default {
  title: 'KeywordFieldItem',
  component: KeywordFieldItem,
};
const Template: Story<ComponentProps<typeof KeywordFieldItem>> = (args) => (
  <KeywordFieldItem {...args} />
);
export const FirstStory = Template;
FirstStory.args = {};
