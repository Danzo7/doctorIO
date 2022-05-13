import { ComponentProps } from 'react';
import type { Story } from '@storybook/react';
import MessagesCategories from './MessagesCategories';
export default {
  title: 'MessagesCategories',
  component: MessagesCategories,
};
const Template: Story<ComponentProps<typeof MessagesCategories>> = (args) => (
  <MessagesCategories {...args} />
);
export const FirstStory = Template.bind({});
FirstStory.args = {};
