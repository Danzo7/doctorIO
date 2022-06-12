import { ComponentProps } from 'react';
import type { Story } from '@storybook/react';
import Tooltip from './Tooltip';
import color from '@assets/styles/color';
export default {
  title: 'Poppers/Tooltip',
  component: Tooltip,
};
const Template: Story<ComponentProps<typeof Tooltip>> = (args) => (
  <Tooltip {...args} />
);
export const FirstStory = Template.bind({});
FirstStory.args = {
  actionList: [
    {
      text: 'add...',
      selectedColor: color.secondary_color,
    },
    {
      text: 'close...',
      selectedColor: color.secondary_color,
    },
    {
      text: 'open...',
      selectedColor: color.secondary_color,
    },
    {
      text: 'delete...',
      selectedColor: color.hot_red,
    },
  ],
};
