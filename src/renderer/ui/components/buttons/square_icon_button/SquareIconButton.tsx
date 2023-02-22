import { ComponentProps } from 'react';
import IconicButton from '../iconic_button';
import { color } from '@assets/styles/color';

function SquareIconButton(
  props: Omit<
    ComponentProps<typeof IconicButton>,
    'width' | 'padding' | 'radius'
  >,
) {
  return (
    <IconicButton
      width={25}
      backgroundColor="transparent"
      afterBgColor={color.light}
      radius={5}
      {...props}
    />
  );
}

export default SquareIconButton;
