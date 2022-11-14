import { ComponentProps } from 'react';
import type { Story } from '@storybook/react';
import ErrorPanel from './ErrorPanel';
export default {
  title: 'ErrorPanel',
  component: ErrorPanel,
};
const Template: Story<ComponentProps<typeof ErrorPanel>> = (args) => (
  <ErrorPanel {...args} />
);
export const FirstStory = Template
FirstStory.args = {};
