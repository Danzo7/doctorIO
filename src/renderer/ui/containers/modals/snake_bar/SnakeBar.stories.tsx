import { ComponentProps } from 'react';
import type { Story } from '@storybook/react';
import SnakeBar from './SnakeBar';
import DarkLightCornerButton from '@components/buttons/dark_light_corner_button';
export default {
  title: 'MODALS/SnakeBar',
  component: SnakeBar,
};
const Template: Story<ComponentProps<typeof SnakeBar>> = (args) => (
  <SnakeBar {...args} />
);
export const FirstStory = Template.bind({});
FirstStory.args = {
  children: <DarkLightCornerButton title="close" />,
};
