import { ComponentProps } from 'react';
import type { Story } from '@storybook/react';
import PreviewList from './PreviewList';
import AppointmentHistoryItem from '@components/appointment_history_panel/appointment_history_item';
import DarkLightCornerButton from '@components/buttons/dark_light_corner_button';
export default {
  title: 'PreviewList',
  component: PreviewList,
};
const Template: Story<ComponentProps<typeof PreviewList>> = (args) => (
  <PreviewList {...args} />
);
export const FirstStory = Template.bind({});
FirstStory.args = {
  title: 'Medical history',
  buttonNode: (
    <DarkLightCornerButton text="Add" isActive={true} onPress={() => {}} />
  ),
  children: <></>,
};
