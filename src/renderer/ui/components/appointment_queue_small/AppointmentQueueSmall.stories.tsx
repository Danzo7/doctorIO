import { ComponentProps } from 'react';
import type { Story } from '@storybook/react';
import AppointmentQueueSmall from './AppointmentQueueSmall';
//👇 This default export determines where your story goes in the story list
export default {
  title: 'queue/AppointmentQueueSmall',
  component: AppointmentQueueSmall,
};
const Template: Story<ComponentProps<typeof AppointmentQueueSmall>> = (
  args,
) => <AppointmentQueueSmall {...args} />;
export const FirstStory = Template.bind({});
FirstStory.args = {};
