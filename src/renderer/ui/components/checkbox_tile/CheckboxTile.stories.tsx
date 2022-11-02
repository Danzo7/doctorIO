import { ComponentProps } from 'react';
import type { Story } from '@storybook/react';
import CheckboxTile from './CheckboxTile';
export default {
  title: 'CheckboxTile',
  component: CheckboxTile,
};
const Template: Story<ComponentProps<typeof CheckboxTile>> = (args) => (
  <CheckboxTile {...args} />
);
export const FirstStory = Template;
FirstStory.args = {
  editable: true,
  primaryText: 'Assistant',
  secondaryText:
    '   people with this role will assist another role, mean they can only access to the dependent role permission',
};
