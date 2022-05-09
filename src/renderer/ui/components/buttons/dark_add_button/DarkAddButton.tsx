import color from '@colors';
import TextButton from '../text_button';
import Add from 'toSvg/add.svg?icon';
interface DarkAddButtonProps {}
export default function DarkAddButton({}: DarkAddButtonProps) {
  return (
    <TextButton
      padding={5}
      borderColor={color.border_color}
      backgroundColor={color.darkersec_color}
    >
      <Add height={11} />
    </TextButton>
  );
}
