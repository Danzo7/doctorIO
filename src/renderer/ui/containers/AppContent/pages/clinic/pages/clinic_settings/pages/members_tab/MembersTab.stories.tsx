import { ComponentProps } from 'react';
import type { Story } from '@storybook/react';
import MembersTab from './MembersTab';
export default {
  title: 'RoleMembers/MembersTab',
  component: MembersTab,
};
const Template: Story<ComponentProps<typeof MembersTab>> = (args) => (
  <MembersTab {...args} />
);
export const FirstStory = Template.bind({});
FirstStory.args = {};
