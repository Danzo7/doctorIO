import React, { ComponentProps } from 'react';
import type { Story } from '@storybook/react';
import LastDmMessage from './LastDmMessage';
export default {
  title: 'LastDmMessage',
  component: LastDmMessage,
};
const Template: Story<ComponentProps<typeof LastDmMessage>> = (args) => (
  <LastDmMessage {...args} />
);
export const FirstStory = Template.bind({});
FirstStory.args = {};
