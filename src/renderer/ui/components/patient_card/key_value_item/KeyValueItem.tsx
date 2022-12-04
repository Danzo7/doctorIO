import { color } from '@assets/styles/color';
import TextPair from '@components/text_pair/TextPair';
import './style/index.scss';
interface KeyValueItemProps {
  primaryText: string;
  secondaryText: string;
  width?: number | string;
}
export default function KeyValueItem({
  primaryText,
  secondaryText,
  width = '30%',
}: KeyValueItemProps) {
  return (
    <TextPair
      gap={2}
      width={width}
      first={{
        text: primaryText,
        fontSize: 12,
        fontWeight: 600,
        fontColor: color.silver_gray,
      }}
      second={{
        text: secondaryText,
        fontSize: 15,
        fontWeight: 700,
        fontColor: color.text_gray,
      }}
    />
  );
}
