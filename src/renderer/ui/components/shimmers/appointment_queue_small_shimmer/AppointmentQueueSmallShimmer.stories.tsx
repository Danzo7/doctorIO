import { ComponentProps } from 'react';
import type { Story } from '@storybook/react';
import AppointmentQueueSmallShimmer from './AppointmentQueueSmallShimmer';
export default {
  title: 'Shimmers/AppointmentQueueSmallShimmer',
  component: AppointmentQueueSmallShimmer,
};
const Template: Story<ComponentProps<typeof AppointmentQueueSmallShimmer>> = (
  args,
) => <AppointmentQueueSmallShimmer {...args} />;
export const FirstStory = Template;
FirstStory.args = {};
