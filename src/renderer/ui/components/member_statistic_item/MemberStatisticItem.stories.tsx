import { ComponentProps } from 'react';
import type { Story } from '@storybook/react';
import MemberStatisticItem from './MemberStatisticItem';
import test from 'toPng/test.png';
export default {
  title: 'MemberStatisticItem',
  component: MemberStatisticItem,
};
const Template: Story<ComponentProps<typeof MemberStatisticItem>> = (args) => (
  <MemberStatisticItem {...args} />
);
export const FirstStory = Template;
FirstStory.args = {
  score: 123456789,
  name: 'Aymen Daouadji',
  avatar: test,
  status: true,
};
