import { ComponentProps } from 'react';
import type { Story } from '@storybook/react';
import ShortStatsPanel from './ShortStatsPanel';

export default {
  title: 'ShortStatsPanel',
  component: ShortStatsPanel,
};
const Template: Story<ComponentProps<typeof ShortStatsPanel>> = (args) => (
  <ShortStatsPanel {...args} />
);
export const FirstStory = Template;
FirstStory.args = {};
