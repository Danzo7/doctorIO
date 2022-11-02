import { ComponentProps } from 'react';
import type { Story } from '@storybook/react';
import MedicamentTable from './MedicamentTable';
export default {
  title: 'MedicamentTable',
  component: MedicamentTable,
};
const Template: Story<ComponentProps<typeof MedicamentTable>> = (args) => (
  <MedicamentTable {...args} />
);
export const FirstStory = Template;
FirstStory.args = {};
