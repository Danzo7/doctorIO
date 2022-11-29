import { ComponentProps } from 'react';
import type { Story } from '@storybook/react';
import SimpleInfoContainer from './SimpleInfoContainer';
export default {
  title: 'SimpleInfoContainer',
  component: SimpleInfoContainer,
};
const Template: Story<ComponentProps<typeof SimpleInfoContainer>> = (args) => (
  <SimpleInfoContainer {...args} />
);
export const FirstStory = Template;
FirstStory.args = {};
