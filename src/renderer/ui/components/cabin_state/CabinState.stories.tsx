import { ComponentProps } from 'react';
import type { Story } from '@storybook/react';
import CabinState from './CabinState';
export default {
  title: 'CabinState',
  component: CabinState,
};
const Template: Story<ComponentProps<typeof CabinState>> = (args) => (
  <CabinState {...args} />
);
export const FirstStory = Template.bind({});
FirstStory.args = {
  state: 'paused',
};
