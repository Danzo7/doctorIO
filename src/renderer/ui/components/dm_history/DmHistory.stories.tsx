import { ComponentProps } from 'react';
import type { Story } from '@storybook/react';
import DmHistory from './DmHistory';
import { MemoryRouter } from 'react-router-dom';
export default {
  title: 'DmHistory',
  component: DmHistory,
};
const Template: Story<ComponentProps<typeof DmHistory>> = (args) => (
  <MemoryRouter>
    <DmHistory {...args} />
  </MemoryRouter>
);
export const FirstStory = Template;
FirstStory.args = {
  list: [],
};
