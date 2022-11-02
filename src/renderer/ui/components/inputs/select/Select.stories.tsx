import { ComponentProps } from 'react';
import type { Story } from '@storybook/react';
import Select from './Select';
import search from 'toSvg/search.svg?icon';
import Svg from '@libs/svg';
export default {
  title: 'Inputs/Select ',
  component: Select,
};
const Template: Story<ComponentProps<typeof Select>> = (args) => (
  <Select {...args} />
);
export const FirstStory = Template;
FirstStory.args = {
  icon: <Svg>{search}</Svg>,
  options: ['اثممخ', 'hello'],
  placeholder: 'placeholder',
};
