import { ComponentProps } from 'react';
import type { Story } from '@storybook/react';
import Tooltip from './Tooltip';
export default {
  title: 'Poppers/Tooltip',
  component: Tooltip,
};
const Template: Story<ComponentProps<typeof Tooltip>> = (args) => (
  <Tooltip {...args} />
);
export const FirstStory = Template;
FirstStory.args = {
  actionList: [
    {
      text: 'add...',
    },
    {
      text: 'close...',
    },
    {
      text: 'open...',
    },
    {
      text: 'delete...',
      type: 'warning',
    },
  ],
};
