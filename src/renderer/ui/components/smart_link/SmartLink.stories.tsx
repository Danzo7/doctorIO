import { ComponentProps } from 'react';
import type { Story } from '@storybook/react';
import SmartLink from './SmartLink';
export default {
  title: 'SmartLink',
  component: SmartLink,
};
const Template: Story<ComponentProps<typeof SmartLink>> = (args) => (
  <SmartLink {...args} />
);
export const FirstStory = Template.bind({});
FirstStory.args = {};
