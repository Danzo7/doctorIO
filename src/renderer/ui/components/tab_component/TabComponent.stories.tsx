import { ComponentProps } from 'react';
import type { Story } from '@storybook/react';
import TabComponent from './TabComponent';
import { color } from '@assets/styles/color';
export default {
  title: 'TabComponent',
  component: TabComponent,
};
const Template: Story<ComponentProps<typeof TabComponent>> = (args) => (
  <TabComponent {...args} />
);
export const FirstStory = Template;
FirstStory.args = {
  items: [
    {
      label: 'tab 1',
      content: <div css={{ backgroundColor: color.background }}>tab1</div>,
    },
    {
      label: 'tab 1',
      content: <div css={{ backgroundColor: color.darker }}>tab2</div>,
    },
    {
      label: 'tab 1',
      content: <div css={{ backgroundColor: color.hot_purple }}>tab3</div>,
    },
    {
      label: 'tab 1',
      content: <div css={{ backgroundColor: color.hot_red }}>tab4</div>,
    },
  ],
};
