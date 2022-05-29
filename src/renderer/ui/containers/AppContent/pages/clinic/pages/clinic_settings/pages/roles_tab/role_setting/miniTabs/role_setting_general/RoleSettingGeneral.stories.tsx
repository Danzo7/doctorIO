import { ComponentProps } from 'react';
import type { Story } from '@storybook/react';
import RoleSettingGeneral from './RoleSettingGeneral';
export default {
  title: 'RoleSettingGeneral',
  component: RoleSettingGeneral,
};
const Template: Story<ComponentProps<typeof RoleSettingGeneral>> = (args) => (
  <RoleSettingGeneral {...args} />
);
export const FirstStory = Template.bind({});
FirstStory.args = {};
