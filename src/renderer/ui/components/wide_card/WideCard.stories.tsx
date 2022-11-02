import { ComponentProps } from 'react';
import type { Story } from '@storybook/react';
import WideCard from './WideCard';
import TextPair from '@components/text_pair/TextPair';
export default {
  title: 'WideCard',
  component: WideCard,
};
const Template: Story<ComponentProps<typeof WideCard>> = (args) => (
  <WideCard {...args} />
);
export const FirstStory = Template;
FirstStory.args = {
  children: [
    <TextPair first="hello" second="world" key={Math.random()} />,
    <TextPair first="hello" second="world" key={Math.random()} />,
    <TextPair first="hello" second="world" key={Math.random()} />,
  ],
};
