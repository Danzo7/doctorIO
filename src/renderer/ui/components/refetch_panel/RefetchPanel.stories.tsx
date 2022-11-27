import { ComponentProps } from 'react';
import type { Story } from '@storybook/react';
import RefetchPanel from './RefetchPanel';
export default {
  title: 'RefetchPanel',
  component: RefetchPanel,
};
const Template: Story<ComponentProps<typeof RefetchPanel>> = (args) => (
  <RefetchPanel {...args} />
);
export const FirstStory = Template
FirstStory.args = {};
