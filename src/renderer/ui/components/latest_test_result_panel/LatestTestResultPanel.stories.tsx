import { ComponentProps } from 'react';
import type { Story } from '@storybook/react';
import LatestTestResultPanel from './LatestTestResultPanel';
export default {
  title: 'LatestTestResultPanel',
  component: LatestTestResultPanel,
};
const Template: Story<ComponentProps<typeof LatestTestResultPanel>> = (
  args,
) => <LatestTestResultPanel {...args} />;
export const FirstStory = Template.bind({});
FirstStory.args = {
  data: {
    Height: '1.75 m',
    Weight: '107 kg',
    Pressure: '15',
    Blood: 'O +',
    ansolin: '15',
    whatever: '20',
  },
};
