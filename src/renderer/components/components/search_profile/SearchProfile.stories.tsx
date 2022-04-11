import React, { ComponentProps } from 'react';
import type { Story } from '@storybook/react';
import SearchProfile from './SearchProfile';
import test from 'toPng/test.png';

export default {
  title: 'SearchProfile',
  component: SearchProfile,
};
const Template: Story<ComponentProps<typeof SearchProfile>> = (args) => (
  <SearchProfile {...args} />
);
export const FirstStory = Template.bind({});
FirstStory.args = {
  status: true,
  imgSrc: test,
};
