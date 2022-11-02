import { ComponentProps } from 'react';
import type { Story } from '@storybook/react';
import PrintedLayout from './PrintedLayout';
export default {
  title: 'PrintedLayout',
  component: PrintedLayout,
};
const Template: Story<ComponentProps<typeof PrintedLayout>> = (args) => (
  <PrintedLayout {...args} />
);
export const FirstStory = Template;
FirstStory.args = {};
