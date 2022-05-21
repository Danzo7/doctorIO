import { color } from '@assets/styles/color';
import IconicButton from '../iconic_button';
import LeftArrow from 'toSvg/left_arrow.svg?icon';
import RightArrow from 'toSvg/right_arrow.svg?icon';
interface ArrowButtonProps {
  arrowDirection: 'Left' | 'Right';
}
export default function ArrowButton({
  arrowDirection = 'Left',
}: ArrowButtonProps) {
  return (
    <IconicButton
      Icon={arrowDirection == 'Left' ? LeftArrow : RightArrow}
      borderColor={color.border_color}
      radius={7}
      height={70}
      width={25}
      iconType="stroke"
      iconColor={color.silver_gray}
    />
  );
}
