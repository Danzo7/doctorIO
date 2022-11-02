import { ComponentProps } from 'react';
import type { Story } from '@storybook/react';
import InputField from './InputWrapper';
import search from 'toSvg/search.svg?icon';
import Svg from '@libs/svg';
export default {
  title: 'Inputs/InputWrapper',
  component: InputField,
};
const Template: Story<ComponentProps<typeof InputField>> = (args) => (
  <InputField {...args} />
);
export const FirstStory = Template;
FirstStory.args = {
  leading: <Svg>{search}</Svg>,
  trailing: <Svg>{search}</Svg>,
};
