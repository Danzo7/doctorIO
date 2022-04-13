import React, { ComponentProps } from 'react';
import type { Story } from '@storybook/react';
import ConversationSearch from './ConversationSearch';
export default {
  title: 'ConversationSearch',
  component: ConversationSearch,
};
const Template: Story<ComponentProps<typeof ConversationSearch>> = (args) => (
  <ConversationSearch {...args} />
);
export const FirstStory = Template.bind({});
FirstStory.args = {};
