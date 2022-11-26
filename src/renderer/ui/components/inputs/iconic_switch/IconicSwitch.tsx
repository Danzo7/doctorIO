import minus from 'toSvg/minus.svg?icon';
import plus from 'toSvg/add.svg?icon';
import SquareIconButton from '@components/buttons/square_icon_button/SquareIconButton';
import { color } from '@colors';
import { useState } from 'react';
import { ControllerProps } from '../input';
interface IconicSwitchProps extends ControllerProps {}
export default function IconicSwitch({ field, onChanged }: IconicSwitchProps) {
  const [isPositive, setIsPositive] = useState(field.value);

  return (
    <SquareIconButton
      tip={isPositive ? 'Positive' : 'Negative'}
      Icon={isPositive ? plus : minus}
      backgroundColor={isPositive ? color.cold_blue : color.cold_red}
      afterBgColor={isPositive ? color.cold_blue : color.cold_red}
      onPress={() => {
        onChanged?.(!isPositive);
        field.onChange?.(!isPositive);
        setIsPositive(!isPositive);
      }}
    />
  );
}
