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
export const FirstStory = Template;
FirstStory.args = {};
