import { ComponentProps } from 'react';
import type { Story } from '@storybook/react';
import PermissionItem from './PermissionItem';
export default {
  title: 'rolestab/PermissionItem',
  component: PermissionItem,
};
const Template: Story<ComponentProps<typeof PermissionItem>> = (args) => (
  <PermissionItem {...args} />
);
export const FirstStory = Template.bind({});
FirstStory.args = {
  name: 'Assistant',
  description:
    '   people with this role will assist another role, mean they can only access to the dependent role permission',
  editable: false,
  linkedPermission: ' @Rythm#3722',
};
