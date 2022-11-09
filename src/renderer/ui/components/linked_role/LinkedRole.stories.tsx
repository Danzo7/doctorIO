import { ComponentProps } from 'react';
import type { Story } from '@storybook/react';
import LinkedRole from './LinkedRole';
export default {
  title: 'LinkedRole',
  component: LinkedRole,
};
const Template: Story<ComponentProps<typeof LinkedRole>> = (args) => (
  <LinkedRole {...args} />
);
export const FirstStory = Template
FirstStory.args = {};
