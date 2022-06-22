import { ComponentProps } from 'react';
import type { Story } from '@storybook/react';
import CabinState from './CabinState';
export default {
  title: 'CabinState',
  component: CabinState,
};
const Template: Story<ComponentProps<typeof CabinState>> = (args) => (
  <CabinState {...args} />
);
export const FirstStory = Template.bind({});
FirstStory.args = {
  state: 'paused',
  patientName: 'Aymen daouadji',
  position: 19,
  arrivalTime: new Date('2022-06-22T19:39:40.000Z'),
};
