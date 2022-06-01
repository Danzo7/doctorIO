import { ComponentProps } from 'react';
import type { Story } from '@storybook/react';
import Records from './Records';
export default {
  title: 'Records',
  component: Records,
};
const Template: Story<ComponentProps<typeof Records>> = (args) => (
  <Records {...args} />
);
export const FirstStory = Template.bind({});
FirstStory.args = {};
