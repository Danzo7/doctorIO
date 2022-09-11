import { ComponentProps } from 'react';
import type { Story } from '@storybook/react';
import MembersPanel from './MembersPanel';
import test from 'toPng/test.png';
export default {
  title: 'MembersPanel',
  component: MembersPanel,
};
const Template: Story<ComponentProps<typeof MembersPanel>> = (args) => (
  <MembersPanel {...args} />
);
export const FirstStory = Template.bind({});
FirstStory.args = {
  membersList: [
    {
      fullName: 'John Doe',
      imgSrc: test,
      memberID: '100',
      status: 'Online',
      roleArray: ['doctor', 'Assistant1', 'Assistant2', 'Assistant3'],
    },
  ],
};
