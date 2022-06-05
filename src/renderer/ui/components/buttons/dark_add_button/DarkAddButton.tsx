import { color } from '@colors';
import { PressHandler } from '../text_button';
import Add from 'toSvg/add.svg?icon';
import IconicButton from '../iconic_button';
interface DarkAddButtonProps {
  onPress?: PressHandler;
}
export default function DarkAddButton({ onPress }: DarkAddButtonProps) {
  return (
    <IconicButton
      radius={7}
      padding={5}
      width={'fit-content'}
      borderColor={color.border_color}
      backgroundColor={color.darkersec_color}
      Icon={<Add height={11} />}
      onPress={onPress}
    />
  );
}
