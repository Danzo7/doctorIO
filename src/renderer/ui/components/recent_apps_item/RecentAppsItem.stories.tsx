import { ComponentProps } from 'react';
import type { Story } from '@storybook/react';
import RecentAppsItem from './RecentAppsItem';
export default {
  title: 'RecentAppsItem',
  component: RecentAppsItem,
};
const Template: Story<ComponentProps<typeof RecentAppsItem>> = (args) => (
  <RecentAppsItem {...args} />
);
export const FirstStory = Template.bind({});
FirstStory.args = {
  fullName: 'John Doe',
  age: 18,
};
