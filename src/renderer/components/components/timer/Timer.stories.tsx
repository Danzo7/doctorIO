import React, { ComponentProps } from 'react';
import type { Story } from '@storybook/react';
import Timer from './Timer';
export default {
  title: 'Timer',
  component: Timer,
  argTypes: {
    ratio: { control: { type: 'range', min: 1, max: 100, step: 1 } },
    pNum: { control: { type: 'range', min: 1, max: 100, step: 1 } },
  },
};
const Template: Story<ComponentProps<typeof Timer>> = (args) => (
  <Timer {...args} />
);
export const FirstStory = Template.bind({});
FirstStory.args = {};
