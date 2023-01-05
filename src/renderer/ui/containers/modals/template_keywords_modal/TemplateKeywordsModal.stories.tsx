import { ComponentProps } from 'react';
import type { Story } from '@storybook/react';
import TemplateKeywordsModal from './TemplateKeywordsModal';
export default {
  title: 'MODALS/TemplateKeywordsModal',
  component: TemplateKeywordsModal,
};
const Template: Story<ComponentProps<typeof TemplateKeywordsModal>> = (
  args,
) => <TemplateKeywordsModal {...args} />;
export const FirstStory = Template;
FirstStory.args = {};
