import { ComponentProps } from 'react';
import type { Story } from '@storybook/react';
import TableDemo from './TableDemo';
export default {
  title: 'TableDemo',
  component: TableDemo,
};
const Template: Story<ComponentProps<typeof TableDemo>> = (args) => (
  <TableDemo {...args} />
);
export const FirstStory = Template.bind({});
FirstStory.args = {};
