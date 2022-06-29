import { ComponentProps } from 'react';
import type { Story } from '@storybook/react';
import SnakeBarActionsControls from './SnakeBarActionsControls';
export default {
  title: 'SnakeBarActionsControls',
  component: SnakeBarActionsControls,
};
const Template: Story<ComponentProps<typeof SnakeBarActionsControls>> = (
  args,
) => <SnakeBarActionsControls {...args} />;
export const FirstStory = Template.bind({});
FirstStory.args = {};
