import React, { ComponentProps } from 'react';
import type { Story } from '@storybook/react';
import MembersTable from './MembersTable';
export default {
  title: 'MembersTable',
  component: MembersTable,
};
const Template: Story<ComponentProps<typeof MembersTable>> = (args) => (
  <MembersTable {...args} />
);
export const FirstStory = Template.bind({});
FirstStory.args = {};
