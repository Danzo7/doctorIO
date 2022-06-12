import { ComponentProps } from 'react';
import type { Story } from '@storybook/react';
import SnakeBar from './SnakeBar';
export default {
  title: 'MODALS/SnakeBar',
  component: SnakeBar,
};
const Template: Story<ComponentProps<typeof SnakeBar>> = (args) => (
  <SnakeBar {...args} />
);
export const FirstStory = Template.bind({});
FirstStory.args = {
  actionList: ['Action1', 'Action2'],
};
