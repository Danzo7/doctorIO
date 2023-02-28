import { ComponentProps } from 'react';
import type { Story } from '@storybook/react';
import PrintPaper from './PrintPaper';
export default {
  title: 'PrintPaper',
  component: PrintPaper,
};
const Template: Story<ComponentProps<typeof PrintPaper>> = (args) => (
  <PrintPaper {...args} />
);
export const FirstStory = Template;
FirstStory.args = {};
