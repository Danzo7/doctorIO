import React, { ComponentProps } from 'react';
import type { Story } from '@storybook/react';
import Firo from './Firo';
export default {
  title: 'Firo',
  component: Firo,
};
const Template: Story<ComponentProps<typeof Firo>> = () => <Firo />;
export const FirstStory = Template.bind({});
FirstStory.args = {};
