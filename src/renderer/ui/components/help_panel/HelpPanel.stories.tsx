import { ComponentProps } from 'react';
import type { Story } from '@storybook/react';
import HelpPanel from './HelpPanel';
export default {
  title: 'HelpPanel',
  component: HelpPanel,
};
const Template: Story<ComponentProps<typeof HelpPanel>> = (args) => (
  <HelpPanel {...args} />
);
export const FirstStory = Template;
FirstStory.args = {
  textList: [
    '“@” is the mention keyword, It automatically finish the following known values: (Patient name, Doctor name, Date, bDate, age)',
    '“/” Is used to auto fill the notice with a defined text.',
  ],
  title: 'Predefined Keywords',
  description:
    'The software provide a predifined keywords that can be used in a textf area to automatically insert a known value. It is similar to tags in social medial and other platforms$',
};
