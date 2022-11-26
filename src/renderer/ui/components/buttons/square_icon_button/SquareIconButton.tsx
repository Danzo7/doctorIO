import { ComponentProps } from 'react';
import IconicButton from '../iconic_button';

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
      afterBgColor="#ffffff20"
      radius={5}
      {...props}
    />
  );
}

export default SquareIconButton;
