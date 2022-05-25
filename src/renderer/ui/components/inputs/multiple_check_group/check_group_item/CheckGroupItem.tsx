import { color } from '@assets/styles/color';
import TextButton from '@components/buttons/text_button';
interface CheckGroupItemProps {
  label: string;
  checked: boolean;
  onSelect: () => void;
}
export default function CheckGroupItem({
  checked,
  label,
  onSelect,
}: CheckGroupItemProps) {
  return (
    <TextButton
      text={label}
      type="button"
      backgroundColor={checked ? color.cold_blue : undefined}
      borderColor={color.border_color}
      onPress={onSelect}
      afterBgColor={color.light}
    />
  );
}
