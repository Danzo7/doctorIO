import { ComponentProps } from 'react';
import type { Story } from '@storybook/react';
import LogoChanger from './LogoChanger';
import profile from '@assets/pictures/test.png';
export default {
  title: 'LogoChanger',
  component: LogoChanger,
};
const Template: Story<ComponentProps<typeof LogoChanger>> = (args) => (
  <LogoChanger {...args} />
);
export const FirstStory = Template.bind({});
FirstStory.args = { src: profile };
