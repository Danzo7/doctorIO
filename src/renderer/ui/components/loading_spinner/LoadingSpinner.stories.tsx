import { ComponentProps } from 'react';
import type { Story } from '@storybook/react';
import LoadingSpinner from './LoadingSpinner';
export default {
  title: 'LoadingSpinner',
  component: LoadingSpinner,
};
const Template: Story<ComponentProps<typeof LoadingSpinner>> = (args) => (
  <LoadingSpinner {...args} />
);
export const FirstStory = Template;
FirstStory.args = {};
