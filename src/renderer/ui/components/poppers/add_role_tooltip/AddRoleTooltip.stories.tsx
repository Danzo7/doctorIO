import { ComponentProps } from 'react';
import type { Story } from '@storybook/react';
import AddRoleTooltip from './AddRoleTooltip';
export default {
  title: 'Poppers/AddRoleTooltip',
  component: AddRoleTooltip,
};
const Template: Story<ComponentProps<typeof AddRoleTooltip>> = (args) => (
  <AddRoleTooltip {...args} />
);
export const FirstStory = Template.bind({});
FirstStory.args = {
  actionList: [
    {
      role: {
        roleName: 'Cool',
        roleId: 1,
        roleDesc: 'cool Role',
      },
    },
    {
      role: {
        roleName: 'Gamer',
        roleId: 2,
        roleDesc: 'Gamer Role',
      },
    },
    {
      role: {
        roleName: 'Cool',
        roleId: 3,
        roleDesc: 'cool Role',
      },
    },
    {
      role: {
        roleName: 'Support',
        roleId: 1,
        roleDesc: 'Support  Role',
      },
    },
  ],
};
