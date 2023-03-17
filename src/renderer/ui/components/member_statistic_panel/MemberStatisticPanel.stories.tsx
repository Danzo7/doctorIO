import { ComponentProps } from 'react';
import type { Story } from '@storybook/react';
import MemberStatisticPanel from './MemberStatisticPanel';
export default {
  title: 'MemberStatisticPanel',
  component: MemberStatisticPanel,
};
const Template: Story<ComponentProps<typeof MemberStatisticPanel>> = (args) => (
  <MemberStatisticPanel {...args} />
);
export const FirstStory = Template
FirstStory.args = {};
