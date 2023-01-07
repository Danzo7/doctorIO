import { ComponentProps } from 'react';
import type { Story } from '@storybook/react';
import EditKeywordValueModal from './EditKeywordValueModal';
export default {
  title: 'MODALS/EditKeywordValueModal',
  component: EditKeywordValueModal,
};
const Template: Story<ComponentProps<typeof EditKeywordValueModal>> = (
  args,
) => <EditKeywordValueModal {...args} />;
export const FirstStory = Template;
FirstStory.args = {};
