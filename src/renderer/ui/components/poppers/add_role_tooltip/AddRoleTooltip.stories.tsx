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
        name: 'Cool',
        id: 1,
        description: 'cool Role',
        priority: 1,
      },
    },
  ],
};
