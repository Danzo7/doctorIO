import { color } from '@assets/styles/color';
import TextButton from '@components/buttons/text_button';
interface CheckGroupItemProps {
  label: string;
  checked: boolean;
  onSelect: () => void;
  disabled?: boolean;
}
export default function CheckGroupItem({
  checked,
  onSelect,
  disabled,
  label,
}: CheckGroupItemProps) {
  return (
    <TextButton
      text={label}
      type="button"
      backgroundColor={checked ? color.cold_blue : color.lighter_background}
      borderColor={color.border_color}
      onPress={onSelect}
      afterBgColor={!checked ? color.light : color.cold_blue}
      disabled={disabled}
    />
  );
}
