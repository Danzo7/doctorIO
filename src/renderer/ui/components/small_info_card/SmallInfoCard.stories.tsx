/* eslint-disable prettier/prettier */
import { ComponentProps } from 'react';
import type { Story } from '@storybook/react';
import SmallInfoCard from './SmallInfoCard';
export default {
  title: 'SmallInfoCard',
  component: SmallInfoCard,
};
const Template: Story<ComponentProps<typeof SmallInfoCard>> = (args) => (
  <SmallInfoCard {...args} />
);
export const FirstStory = Template.bind({});
FirstStory.args = {
  data: {
    'In queue': '30',
    "unpaid": '10',
    "urgent": '2',
  },
};
