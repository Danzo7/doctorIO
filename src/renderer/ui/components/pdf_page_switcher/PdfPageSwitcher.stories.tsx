import { ComponentProps } from 'react';
import type { Story } from '@storybook/react';
import PdfPageSwitcher from './PdfPageSwitcher';
export default {
  title: 'PdfPageSwitcher',
  component: PdfPageSwitcher,
};
const Template: Story<ComponentProps<typeof PdfPageSwitcher>> = (args) => (
  <PdfPageSwitcher {...args} />
);
export const FirstStory = Template
FirstStory.args = {};
