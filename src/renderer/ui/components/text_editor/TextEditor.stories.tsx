import { ComponentProps } from 'react';
import type { Story } from '@storybook/react';
import TextEditor from './TextEditor';
export default {
  title: 'TextEditor',
  component: TextEditor,
};
const Template: Story<ComponentProps<typeof TextEditor>> = (args) => (
  <TextEditor {...args} />
);
export const FirstStory = Template;
FirstStory.args = {
  initialValue: [
    {
      type: 'p',
      children: [{ text: 'This is editable ' }],
    },
  ],
};
