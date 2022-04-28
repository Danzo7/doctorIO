import { ComponentProps } from 'react';
import type { Story } from '@storybook/react';
import ShortStatsPanel from './ShortStatsPanel';
import exclamation from 'toSvg/exclamation.svg?icon';
import colors from '@colors';
export default {
  title: 'ShortStatsPanel',
  component: ShortStatsPanel,
};
const Template: Story<ComponentProps<typeof ShortStatsPanel>> = (args) => (
  <ShortStatsPanel {...args} />
);
export const FirstStory = Template.bind({});
FirstStory.args = {
  miniStatsList: [
    {
      text: 'Revenue',
      value: 1.4,
      Icon: exclamation,
      percentage: 5,
    },
    {
      text: 'Visitors',
      value: 24,
      Icon: exclamation,
      percentage: 10,
    },
    {
      text: 'Messages',
      value: 19,
      Icon: exclamation,
      backgroundColor: colors.hot_red,
    },
    {
      text: 'Queue',
      value: 18,
      Icon: exclamation,
    },
  ],
};
