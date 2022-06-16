import { ComponentProps } from 'react';
import type { Story } from '@storybook/react';
import AddSelectedToQueueModal from './AddSelectedToQueueModal';
export default {
  title: 'Modals/AddSelectedToQueueModal',
  component: AddSelectedToQueueModal,
};
const Template: Story<ComponentProps<typeof AddSelectedToQueueModal>> = (
  args,
) => <AddSelectedToQueueModal {...args} />;
export const FirstStory = Template.bind({});
FirstStory.args = {
  fullName: 'John Doe',
  age: 18,
};