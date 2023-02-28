import { ComponentProps } from 'react';
import type { Story } from '@storybook/react';
import EyePassword from './EyePassword';
export default {
  title: 'EyePassword',
  component: EyePassword,
};
const Template: Story<ComponentProps<typeof EyePassword>> = (args) => (
  <EyePassword {...args} />
);
export const FirstStory = Template;
FirstStory.args = {};
