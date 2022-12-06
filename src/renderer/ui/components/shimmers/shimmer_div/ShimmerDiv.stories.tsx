import { ComponentProps } from 'react';
import type { Story } from '@storybook/react';
import ShimmerDiv from './ShimmerDiv';
export default {
  title: 'ShimmerDiv',
  component: ShimmerDiv,
};
const Template: Story<ComponentProps<typeof ShimmerDiv>> = (args) => (
  <ShimmerDiv {...args} />
);
export const FirstStory = Template;
FirstStory.args = { width: 60, height: 60, borderRadius: 7 };
