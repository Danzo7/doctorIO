import { color } from '@colors';
import Add from 'toSvg/add.svg?icon';
import IconicButton from '../iconic_button';
import { ComponentProps } from 'react';

export default function DarkAddButton(
  props: Omit<
    ComponentProps<typeof IconicButton>,
    'backgroundColor' | 'borderColor' | 'width' | 'padding' | 'radius' | 'Icon'
  >,
) {
  return (
    <IconicButton
      tip="Add a role"
      radius={7}
      padding={5}
      width={'fit-content'}
      borderColor={color.border_color}
      Icon={<Add height={11} width={11} />}
      {...props}
    />
  );
}
