import { ComponentProps } from 'react';
import type { Story } from '@storybook/react';
import SmallClinicStatus from './SmallClinicStatus';
export default {
  title: 'SmallClinicStatus',
  component: SmallClinicStatus,
};
const Template: Story<ComponentProps<typeof SmallClinicStatus>> = (args) => (
  <SmallClinicStatus {...args} />
);
export const FirstStory = Template;
FirstStory.args = {};
