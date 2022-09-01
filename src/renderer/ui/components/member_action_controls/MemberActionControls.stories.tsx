import { ComponentProps } from 'react';
import type { Story } from '@storybook/react';
import MemberActionControls from './MemberActionControls';
import { members } from '@api/fake';
export default {
  title: 'MemberActionControls',
  component: MemberActionControls,
};
const Template: Story<ComponentProps<typeof MemberActionControls>> = (args) => (
  <MemberActionControls {...args} />
);
export const FirstStory = Template.bind({});
FirstStory.args = {
  id: members[0].id,
};
