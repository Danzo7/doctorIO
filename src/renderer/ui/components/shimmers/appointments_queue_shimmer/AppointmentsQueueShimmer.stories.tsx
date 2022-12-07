import { ComponentProps } from 'react';
import type { Story } from '@storybook/react';
import AppointmentsQueueShimmer from './AppointmentsQueueShimmer';
export default {
  title: 'Shimmers/AppointmentsQueueShimmer',
  component: AppointmentsQueueShimmer,
};
const Template: Story<ComponentProps<typeof AppointmentsQueueShimmer>> = (
  args,
) => <AppointmentsQueueShimmer {...args} />;
export const FirstStory = Template;
FirstStory.args = {};
