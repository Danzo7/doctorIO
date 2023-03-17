import { ComponentProps } from 'react';
import type { Story } from '@storybook/react';
import GeneralStatisticTab from './GeneralStatisticTab';
export default {
  title: 'GeneralStatisticTab',
  component: GeneralStatisticTab,
};
const Template: Story<ComponentProps<typeof GeneralStatisticTab>> = (args) => (
  <GeneralStatisticTab {...args} />
);
export const FirstStory = Template
FirstStory.args = {};
