import { ComponentProps } from 'react';
import type { Story } from '@storybook/react';
import OverviewInfoForm from './OverviewInfoForm';
export default {
  title: 'Overview/OverviewInfoForm',
  component: OverviewInfoForm,
};
const Template: Story<ComponentProps<typeof OverviewInfoForm>> = (args) => (
  <OverviewInfoForm {...args} />
);
export const FirstStory = Template.bind({});
FirstStory.args = {};
