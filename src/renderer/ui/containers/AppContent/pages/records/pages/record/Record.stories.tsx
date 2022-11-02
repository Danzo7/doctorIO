import { ComponentProps } from 'react';
import type { Story } from '@storybook/react';
import Record from './Record';
export default {
  title: 'Record',
  component: Record,
};
const Template: Story<ComponentProps<typeof Record>> = (args) => (
  <Record {...args} />
);
export const FirstStory = Template;
FirstStory.args = {};
