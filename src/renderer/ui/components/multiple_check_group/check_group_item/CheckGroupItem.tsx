import { color } from '@assets/styles/color';
import TextButton from '@components/buttons/text_button';
import './style/index.scss';
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
      backgroundColor={checked ? color.cold_blue : color.darkersec_color}
      onPress={onSelect}
    />
  );
}
