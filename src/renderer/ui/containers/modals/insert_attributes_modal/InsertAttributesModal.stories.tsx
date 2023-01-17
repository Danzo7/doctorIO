import { ComponentProps } from 'react';
import type { Story } from '@storybook/react';
import InsertAttributesModal from './InsertAttributesModal';
export default {
  title: 'InsertAttributesModal',
  component: InsertAttributesModal,
};
const Template: Story<ComponentProps<typeof InsertAttributesModal>> = (
  args,
) => <InsertAttributesModal {...args} />;
export const FirstStory = Template;
FirstStory.args = {
  elements: [
    {
      group: { name: 'Patient', color: 'red' },
      items: ['First name', 'Last name', 'Age', 'Birth date'],
    },
    {
      group: { name: 'Patient', color: 'blue' },
      items: ['First name', 'Last name', 'id'],
    },
  ],
};
