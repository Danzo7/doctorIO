import { ComponentProps } from 'react';
import type { Story } from '@storybook/react';
import MainLayer from './MainLayer';
export default {
  title: 'MainLayer',
  component: MainLayer,
};
const Template: Story<ComponentProps<typeof MainLayer>> = (args) => (
  <MainLayer {...args} />
);
export const FirstStory = Template;
FirstStory.args = {};
