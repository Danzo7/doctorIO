import { ComponentProps } from 'react';
import type { Story } from '@storybook/react';
import TemplateTab from './TemplateTab';
export default {
  title: 'TemplateTab',
  component: TemplateTab,
};
const Template: Story<ComponentProps<typeof TemplateTab>> = (args) => (
  <TemplateTab {...args} />
);
export const FirstStory = Template;
FirstStory.args = {};
