import { ComponentProps } from 'react';
import type { Story } from '@storybook/react';
import TemplateEdtor from './TemplateEdtor';
export default {
  title: 'TemplateEdtor',
  component: TemplateEdtor,
};
const Template: Story<ComponentProps<typeof TemplateEdtor>> = (args) => (
  <TemplateEdtor {...args} />
);
export const FirstStory = Template;
FirstStory.args = {};
